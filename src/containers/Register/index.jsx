import React, { Component } from 'react'
import {NavBar,InputItem,WhiteSpace,Button,Toast} from 'antd-mobile'
import {reqRegister} from '../../api'

var promise = null
export default class Register extends Component {
    state = {
        username: '',  // 用户名
        password: '',  // 密码
        password2: ''  // 确认密码
    }

    componentWillUnmount(){
        if(promise){
            Promise.race([promise, Promise.resolve()])
        }
    }

    // 处理输入数据的改变: 更新对应的状态
    handleChange = (name, val) => {
        // 更新状态
        this.setState({
            [name]: val  // 属性名不是name, 而是name变量的值
        })
    }

    toLogin = () => {
        this.props.history.replace('/login')
    }

    register = ()=>{
        const {username, password, password2} = this.state
        if(username===''){// 用户名为空
            Toast.info('用户名不能为空！', 1);// 提示错误信息
            return
        }else if(password===''){
            Toast.info('密码不能为空！', 1);// 提示错误信息
            return
        }else if(password2===''){
            Toast.info('请再次输入密码！', 1);// 提示错误信息
            return
        }else if(password!==password2){
            Toast.info('两次输入的密码不一致！', 1);// 提示错误信息
            return
        }

        promise = reqRegister({username, password})
        promise.then(value=>{
            const response = value.data// {code:1, msg:'此用户已存在'}或者{code:0, data:{}}
            if(response.code===0){//注册成功
                this.props.history.replace('/chat')
            }else{// 注册失败
                Toast.info(response.msg, 1)
            }
        })
    }


    render() {
        return (
            <div>
                <NavBar>注&nbsp;册</NavBar>
                <InputItem placeholder='请输入用户名' onChange={val => {this.handleChange('username', val)}}>用户名:</InputItem>
                <InputItem placeholder='请输入密码' type="password" onChange={val => {this.handleChange('password', val)}}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                <InputItem placeholder='请输入确认密码' type="password" onChange={val => {this.handleChange('password2', val)}}>确认密码:</InputItem>

                <WhiteSpace/>
                <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
                <Button onClick={this.toLogin}>已有账户</Button>
            </div>
        )
    }
}
