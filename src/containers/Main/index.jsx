import {Redirect, Route, Switch} from 'react-router-dom'
import Header from '../../components/Header';
import Footer from '../../components/Footer'
import UserCenter from '../../containers/UserCenter'
import NotFound from '../../components/NotFound';
import React, { Component } from 'react'
import ChangeInformation from '../../containers/ChangeInformation';
import Chat from '../../containers/Chat';
import '../../assets/css/style.css'
import MessageDetail from '../../containers/MessageDetail';
import Cookies from 'js-cookie'
import {reqUser} from '../../api'


var promise = null
class Main extends Component {
  state = {
    msgid: ''
  }

  componentWillUnmount(){
    if(promise){
      Promise.race([promise, Promise.resolve()])
    }
  }

  componentDidMount(){
    // 读取浏览器中的cookie
    const userid = Cookies.get('userid')
    if(!userid){// 跳转到登录页面
        this.props.history.replace('/login')
    }else{
      promise = reqUser({userid})
      promise.then(value=>{
        const response = value.data
        if(response.code===1){//userid非法
          this.props.history.replace('/login')// 跳转到登录页面
          return
        }
      })
    }
  }

  render() {
    const pathname = this.props.location.pathname// 当前路径
    let title = '聊天室'
    if(pathname==='/'){
      return <Redirect to='/chat'/>
    }else if(pathname==='/chat'){
      title = '聊天室'
    }else if(pathname==='/usercenter'){
      title = '个人中心'
    }else if(pathname==='/changeInformation'){
      title = '修改信息'
    }

    return (
      <div className="App"> 
        <Header title={title} />
        <Switch>
          <Route path='/chat' component={Chat} />
          <Route path='/message/:msgid' component={MessageDetail} />
          <Route path='/usercenter' component={UserCenter} />
          <Route path='/changeInformation' component={ChangeInformation} /> 
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
