# realtime-chatting
基于React，antd-mobile，axios，Node JS，socket.io和MongoDB等的实时聊天应用
前端使用了：react框架，nanoid, antd-mobile, js-cookie, react-router-dom, socket.io-client, axios等
后端使用了：nodejs, mongodb, mongoose, socket.io, express框架，blueimp-md5等

使用creat-react-app创建，目前优化空间比较大,，比如可以较少请求数据库的次数等，待后续优化

# 如何启动
>yarn start //或者npm start

// 启动后端
>cd server
node app.js

# 数据库的配置
默认使用 'mongodb://localhost:27017/local'

# 数据库模型
![image](https://user-images.githubusercontent.com/49555245/120787497-0073fb80-c562-11eb-94f7-d2400a4a5c7c.png)
![image](https://user-images.githubusercontent.com/49555245/120789081-a1da5d80-c520-11eb-8195-f1a36f7c6e46.png)

# 登录页面
![image](https://user-images.githubusercontent.com/49555245/120787627-226d7e00-c562-11eb-99fa-19a39e13ce9e.png)

# 注册页面，注册成功后跳转到主页面
![image](https://user-images.githubusercontent.com/49555245/120787680-2c8f7c80-c562-11eb-8040-5fcfa762fcd4.png)

# 主页面
![image](https://user-images.githubusercontent.com/49555245/120787860-606aa200-c562-11eb-9845-76e303b9ed0b.png)
![image](https://user-images.githubusercontent.com/49555245/120787969-7ed09d80-c562-11eb-8738-fa973349fff0.png)

# 发送消息（左一：qianjin，左二：tom）
![image](https://user-images.githubusercontent.com/49555245/120791676-133cff00-c567-11eb-8011-53df66bb37fb.png)
![image](https://user-images.githubusercontent.com/49555245/120791935-63b45c80-c567-11eb-99a0-20bae7686b88.png)


# 点击消息查看详情
![image](https://user-images.githubusercontent.com/49555245/120791988-775fc300-c567-11eb-98db-4dea960ff245.png)
![image](https://user-images.githubusercontent.com/49555245/120792014-80509480-c567-11eb-95b9-a2b928284e36.png)


# 修改信息页面
（注册的时候默认没有输入个性签名和头像，使用默认值{signature:平平淡淡才是真', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/pdFARIqkrKEGVVEwotFe.svg'}）是个支付宝图标的头像，因为用的是antd-mobile
![image](https://user-images.githubusercontent.com/49555245/120788869-5b84fe80-c520-11eb-9838-62a2c4d9207c.png)


