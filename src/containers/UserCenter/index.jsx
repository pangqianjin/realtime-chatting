import React, { Component } from 'react'
import {Button, WhiteSpace, WingBlank, Result,Modal} from 'antd-mobile'
import Cookies from 'js-cookie'
import {reqUser} from '../../api'


var promise = null
export default class UserCenter extends Component {
    state = {
        username: '一个普通人',
        signature: '平平淡淡才是真',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/pdFARIqkrKEGVVEwotFe.svg'
    }

    componentDidMount(){
        // 读取浏览器中的cookie
        const userid = Cookies.get('userid')
        // 根据cookie中的userid到数据库中获取user信息
        promise = reqUser({userid})
        promise.then(value=>{
            const response = value.data
            if(response.code===1){//userid非法
                this.props.history.replace('/login')// 跳转到登录页面
                return
            }else{//显示个人信息
                const {username, signature, avatar} = response.data
                this.setState({username})// username是必然存在的
                if(signature!=='') this.setState({signature})// 个性签名为空用默认的
                if(avatar!=='') this.setState({avatar})// 头像为空用默认的
            }
        })
    }

    componentWillUnmount(){
        if(promise){
            Promise.race([promise, Promise.resolve()])
        }
    }

    // 修改个人信息
    changeInformation = ()=>{
        this.props.history.push('/changeInformation')
    }

    // 退出登录
    logout = ()=>{
        Modal.alert('退出', '确定退出登陆吗?', [
            {text: '取消'},
            {
              text: '确定',
              onPress: ()=> {
                // 干掉cookie中userid
                Cookies.remove('userid')
                // 跳转页面
                this.props.history.replace('/login')
              }
            }
          ])
    }

    render() {
        const {username, signature, avatar} = this.state
        return (
            <div >
                <Result title={username} message={<span>{signature}</span>}
                img={<img src={avatar} alt='头像' style={{width:'60px', height:'60px'}} />} /> 
                <WhiteSpace/>
                <WingBlank>
                <Button type='primary' onClick={this.changeInformation}>修改信息</Button>
                <Button type='ghost' onClick={this.logout}>退出登录</Button>
                </WingBlank>
            </div>
        )
    }
}
