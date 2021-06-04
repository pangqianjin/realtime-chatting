/*
包含n个操作数据库集合数据的Model模块
1. 连接数据库
  1.1. 引入mongoose
  1.2. 连接指定数据库(URL只有数据库是变化的)
  1.3. 获取连接对象
  1.4. 绑定连接完成的监听(用来提示连接成功)
2. 定义出对应特定集合的Model并向外暴露
  2.1. 字义Schema(描述文档结构)
  2.2. 定义Model(与集合对应, 可以操作集合)
  2.3. 向外暴露Model
 */

/*1. 连接数据库*/
// 1.1. 引入mongoose
const mongoose = require('mongoose')
// 1.2. 连接指定数据库(URL只有数据库是变化的)
mongoose.connect('mongodb://localhost:27017/local')
// 1.3. 获取连接对象
const conn = mongoose.connection
// 1.4. 绑定连接完成的监听(用来提示连接成功)
conn.on('connected', () => {
  console.log('db connect success!')
})

/*2. 定义出对应特定集合的Model并向外暴露*/
// 2.1. 字义Schema(描述文档结构)
const userSchema = mongoose.Schema({
  username: {type: String, required: true}, // 用户名
  password: {type: String, required: true}, // 密码
  signature: {type: String}, // 个性签名
  avatar: {type: String}, // 头像URI
})
// 2.2. 定义Model(与集合对应, 可以操作集合)
const UserModel = mongoose.model('user', userSchema) // 集合为: users
// 2.3. 向外暴露Model
exports.UserModel = UserModel

