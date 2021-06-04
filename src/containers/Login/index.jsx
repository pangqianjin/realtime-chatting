import { NavBar,WhiteSpace, InputItem,Button,List,Toast } from 'antd-mobile'
import React, { Component } from 'react'
import {reqLogin} from '../../api'


var promise = null
export default class Login extends Component {
    state = {
        username: '',  // 用户名
        password: '',  // 密码
    }

    componentWillUnmount(){
        if(promise){
            Promise.race([promise, Promise.resolve()])
        }
    }

    login = () =>{
        const {username, password} = this.state
        promise = reqLogin({username, password})
        promise.then(value=>{
            const response = value.data// {code:1, msg:'用户名或密码不正确!'}或者{code:0, data:{}}
            if(response.code===0){// 登录信息验证成功
                this.props.history.replace('/chat')// 跳转页面
            }else{// 账号或密码错误
                Toast.info(response.msg, 1);// 提示错误信息
            }
        })
    }

    // 处理输入数据的改变: 更新对应的状态
    handleChange = (name, val) => {
        // 更新状态
        this.setState({
            [name]: val  // 属性名不是name, 而是name变量的值
        })
    }

    toRegister = () => {
        this.props.history.replace('/register')
    }

    render() {
        return (
            <div>
                <NavBar>登&nbsp;录</NavBar>
                <List>
                    <InputItem placeholder='请输入用户名' onChange={val => {this.handleChange('username', val)}}>用户名:</InputItem>
                    <InputItem placeholder='请输入密码' type="password" onChange={val => {this.handleChange('password', val)}}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;&nbsp;陆</Button>
                    <WhiteSpace />
                    <Button onClick={this.toRegister}>还没有账户</Button>
                </List>
            </div>
        )
    }
}
