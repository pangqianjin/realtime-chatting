import ajax from './ajax'


// 请求登录
export const reqLogin = ({username, password}) => ajax('/login',{username, password}, 'POST')

// 请求注册
export const reqRegister = ({username, password}) => ajax('/register',{username, password}, 'POST')

// 请求所有聊天信息
export const reqMessages = ()=>ajax('/chat')

// 根据msgid请求指定的聊天记录
export const reqMessage = ({msgid})=>ajax('/message', {msgid})

// 根据userid请求user对应的信息
export const reqUser = ({userid})=>ajax('/user', {userid}, 'POST')

// 请求更新个人信息,类似注册
export const reqUpdateUser = ({userid, username, password, signature, avatar}) => ajax('/updateuser', {userid, username, password, signature, avatar}, 'POST')
