# school_facebook 项目后端

基于**Node.js** 、 **MongoDB**、 **Express** 、 **ES6**

执行命令

`npm start`

----

接口列表说明：

1. 向接口发送请求请带上入口参数，注意每个参数类型（几乎都是string），发送方式，请求头等问题。
2. 发送的url为：115.28.180.202:3000加上接口名称

 > 例如新建用户端口：
 > 115.28.180.202:3000/user/create_user

3. 请求头说明：setRequestHeader('Content-type', 'application/x-www-form-urlencoded') 
4. 必选入口参数说明：表中给出的只是必选的参数，还有附带的参数请去Robot2T工具中查看，或者咨询我。
5. 出口参数说明：返回数据格式统一，可以使用postman查看每个接口的返回信息，统一格式如下：

```
//成功的返回
{
    code: 200,
    message: codeMsg['200'],
    data: user
}
//失败的返回
{
    code: err.code,
    message: CodeMsg[err.code] || CodeMsg['10101'],
    data: err.message
}
//文中的code状态码以及代表的含义请在school_facebook_node项目下的utils/code.js中查看
```

| 接口名称|接口说明|发送方式|必选入口参数 | 出口参数 |
| -------|------ |-------------| -----|-----|
| user/create_user | 新建用户 |post |username,password |user|
| user/login| 用户登录 | post |username,password|user|


----------


**ps:关于接口这边有问题的话就来找我**