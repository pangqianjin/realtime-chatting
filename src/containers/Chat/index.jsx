import React, { Component } from 'react'
import {InputItem, List} from 'antd-mobile'
import io from 'socket.io-client'
import {nanoid} from 'nanoid'
import Cookies from 'js-cookie'
import {reqMessages, reqUser} from '../../api'
import './style.css'


var promise = null
export default class Chat extends Component {
  state = {
      username: '一个普通人',
      content: '',
      messages: []
  }


  componentDidUpdate () {
    // 更新显示列表
    const chatMsg = document.getElementById('chat-msg')
    chatMsg.scrollTo(0, chatMsg.scrollHeight)
  }

  componentWillUnmount(){
    clearInterval(this.interval)//清除定时器

    if(promise){
      Promise.race([promise, Promise.resolve()])
    } 
  }

  componentDidMount() {
    // 定时从服务器获取消息
    this.interval = setInterval(()=>{
      // 更新消息列表
      promise = reqMessages()
      promise.then(value=>{
          this.setState({messages:value.data})
      })
    }, 2000)


    // 读取浏览器中的cookie
    const userid = Cookies.get('userid')
    // 获取用户名
    promise = reqUser({userid})
    promise.then(value=>{
      const response = value.data
      if(response.code===1){//userid非法
        this.props.history.replace('/login')// 跳转到登录页面
        return 
      }else{
        const {username} = response.data
        this.setState({username})// 设置用户名状态
      }
    })



    // 初始显示列表
    const chatMsg = document.getElementById('chat-msg')
    chatMsg.scrollTo(0, chatMsg.scrollHeight)

    // 更新消息列表
    promise = reqMessages()
    promise.then(value=>{
      if(this.state.messages.length===0){// 如果当前消息列表为空，更新消息列表
        this.setState({messages:value.data})
      }
    })
    

    if(!io.socket) {
      // 连接服务器, 得到与服务器的连接对象
      io.socket = io('ws://localhost:4000', {transports: ['websocket']})  // 2. 创建对象之后: 保存对象
    }
    // 绑定监听, 接收服务器发送的消息
    io.socket.on('chat', msg=>{
      let {messages} = this.state
      messages = [...messages, msg]
      this.setState({messages})
    })
  }


  // 发送消息
  sendMsg = ()=>{
    // 一个message: {id:nanoid, from: username, content: '', time: Date}
    const {username, content} = this.state
    if(!io.socket) {
      // 连接服务器, 得到与服务器的连接对象
      io.socket = io('ws://localhost:4000', {transports: ['websocket']})  // 2. 创建对象之后: 保存对象
    }
    io.socket.emit('chat', {id:nanoid(), from:username, content, time: new Date().toTimeString()})
    this.setState({content: ''})
  }

  // 点击查看消息详情
  viewMsg = (msgid)=>{
    return ()=>{
      this.props.history.push(`/message/${msgid}`)
    }
  }

  render() {
    const {messages} = this.state
    return (
      <div>
        <div id='chat-msg'>
        <List>
          {
            messages.map(message=>{
              // 点击查看消息详情
              return <List.Item key={message.id} onClick={this.viewMsg(message.id)}>
                      {message.from}:&nbsp;{message.time}
                      <List.Item.Brief>{message.content}</List.Item.Brief>
                    </List.Item>
            })
          } 
        </List>
        </div>
        <div id='input-item'>
          <InputItem onChange={val => this.setState({content: val})}
          value={this.state.content}
          extra={<span onClick={this.sendMsg}>发送</span>} /> 
        </div>
          
              
     </div>
    )}
}
