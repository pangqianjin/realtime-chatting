import React, { Component } from 'react'
import {List, InputItem, Button,WhiteSpace,Toast, Result} from 'antd-mobile'
import { reqUpdateUser } from '../../api'
import Cookies from 'js-cookie'


var promise = null
export default class ChangeInformation extends Component {
    state = {
        username: '',//用户名
        password: '',//密码
        password2: '',//确认密码
        signature: '',//个性签名
        avatar: ''//头像URI
    }

    componentWillUnmount(){
        if(promise){
            Promise.race([promise, Promise.resolve()])
        }
    }

    handleChange = (name, value)=>{
        this.setState({[name]: value})
    }

    save = ()=>{
        const {username, password, password2, signature, avatar} = this.state
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
        
        const userid = Cookies.get('userid')
        promise = reqUpdateUser({userid, username, password, signature, avatar})
        promise.then(value=>{
            const response = value.data 
            if(response.code===0){// 信息更新成功
                this.props.history.replace('/login')
            }else{
                Toast.info(response.msg, 1)//提示错误信息
            }
        })
    }


    render() {
        return (
            <div>
                <List>
                <InputItem placeholder='请输入用户名' onChange={val => {this.handleChange('username', val)}}>用户名:</InputItem>
                <InputItem placeholder='请输入密码' type="password" onChange={val => {this.handleChange('password', val)}}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                <InputItem placeholder='请输入确认密码' type="password" onChange={val => {this.handleChange('password2', val)}}>确认密码:</InputItem>
                <InputItem placeholder='请输入个性签名' onChange={val => {this.handleChange('signature', val)}}>个性签名:</InputItem>
                <InputItem placeholder='请输入头像的URL' onChange={val => {this.handleChange('avatar', val)}}>头像URL:</InputItem>
                <WhiteSpace/>
                </List>
                
                <Result img={<img style={{width:'60px',height:'60px'}} src={this.state.avatar} alt='预览'/>}  />
                <Button type='primary' onClick={this.save}>保存</Button>
            </div>
        )
    }
}
