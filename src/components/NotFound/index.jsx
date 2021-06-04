import React, { Component } from 'react'
import {Button} from 'antd-mobile'

export default class NotFound extends Component {
    render() {
        return (
            <div>
                <h2>抱歉，找不到该页面!!</h2>
                <Button type='primary'
                onClick={()=>this.props.history.replace('/rooms')}
                >返回聊天室列表</Button>
            </div>
        )
    }
}
