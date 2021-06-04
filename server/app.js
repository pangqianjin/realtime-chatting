var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');// 使用req.body
const md5 = require('blueimp-md5')
const {UserModel} = require('./models')

app.use(bodyParser.json());// 使用req.body
app.use(bodyParser.urlencoded({ extended: false }));// 使用req.body

var messages = []// 消息列表
var messagesMap = {}// 消息列表，为键值对{msgid: messageObj}

// socketIO
io.on('connection', (socket)=>{
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat', msg=>{
        io.emit('chat', msg);
        messages.push(msg)
        const {id} = msg
        messagesMap[id] = msg
    })
})


const filter = {password: 0, __v: 0} // 指定过滤的属性
// 请求登录
app.post('/login', (req, res)=>{
    const {username, password} = req.body
    // 根据username和password查询数据库users, 如果没有, 返回提示错误的信息, 如果有, 返回登陆成功信息(包含user)
    UserModel.findOne({username, password:md5(password)}, filter, function (err, user) {
        if(user) { // 登陆成功
            // 生成一个cookie(userid: user._id), 并交给浏览器保存
            res.cookie('userid', user._id, {maxAge: 1000*60*60*24})
            // 返回登陆成功信息(包含user)
            res.send({code: 0, data: user})
        } else {// 登陆失败
            res.send({code: 1, msg: '用户名或密码不正确!'})
        }
    })
})



// 请求注册
app.post('/register', (req, res)=>{
    const {username, password} = req.body
    // 处理: 判断用户是否已经存在, 如果存在, 返回提示错误的信息, 如果不存在, 保存
    // 查询(根据username)
    UserModel.findOne({username}, function (err, user) {
        // 如果user有值(已存在)
        if(user) {
            // 返回提示错误的信息
            res.send({code: 1, msg: '此用户已存在'})
        } else { // 没值(不存在)
            // 保存
            new UserModel({username, password:md5(password), signature:'', avatar:''}).save(function (error, user) {

                // 生成一个cookie(userid: user._id), 并交给浏览器保存
                res.cookie('userid', user._id, {maxAge: 1000*60*60*24})
                // 返回包含user的json数据
                const data = {username, userid: user._id, signature:'', avatar:''} // 响应数据中不要携带password
                res.send({code: 0, data})
            })
        }
    })
})

// 请求更新用户信息
app.post('/updateuser', (req, res)=>{
    const {username, password, signature, avatar} = req.body
    let {userid} = req.body
    userid = userid.split(':')[1]
    userid = userid.substring(1, userid.length-1)

    UserModel.findByIdAndUpdate(userid, {username, password:md5(password), signature, avatar}, function (error, oldUser) {

        if(!oldUser) {
          // 通知浏览器删除userid cookie
          res.clearCookie('userid')
          // 返回返回一个提示信息
          res.send({code: 1, msg: '请先登陆'})
        } else {
          // 准备一个返回的user数据对象
          const data = {...oldUser, username, password:md5(password), signature, avatar}
          // 返回
          res.send({code: 0, data})
        }
      })
})


// 根据浏览器cookie的userid查看该userid是否为真，再决定是否允许直接登录
app.post('/user', (req, res)=>{
    let {userid} = req.body
    userid = userid.split(':')[1]
    userid = userid.substring(1, userid.length-1)
    
    // 根据userid查询数据库users, 如果没有, 返回提示错误的信息, 如果有, 返回登陆成功信息(包含user)
    UserModel.findById(userid, filter, function (err, user) {
        if(user) { // userid真实存在
            // 生成一个cookie(userid: user._id), 并交给浏览器保存
            res.send({code: 0, data: user})
        } else {// userid非法
            res.send({code: 1, msg: 'userid非法!'})
        }
    })
})

// 请求所有聊天信息
app.get('/chat', (req, res)=>{
    res.send(messages) 
})

// 请求指定msgid的聊天信息
app.get('/message', (req, res)=>{
    const {msgid} = req.query
    res.send(messagesMap[msgid])
})

app.get('/user', (req, res)=>{
    const {userid} = req.query
    console.log(userid)
})


http.listen(4000, ()=>{
    console.log('服务启动中，端口4000已开启...')
});