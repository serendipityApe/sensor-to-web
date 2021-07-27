const Koa = require('koa');
const cors = require('koa2-cors')
const app=new Koa();
const router = require('koa-router')();
const mongoose = require('mongoose')
var bodyParser= require('koa-bodyparser'); 
const db=require('./db/connect')
const ws=require('./routers/websocket')  //websocket
const serialPort=require('./serialPort/index')


const Room =  require('./routers/roomRouter')
const User =  require('./routers/userRouter')
app.use(bodyParser()); 
app.use(cors())

router.get('/', function (ctx, next) {
    ctx.body="Hello koa";
    })
app.use(Room.routes()).use(Room.allowedMethods())
app.use(User.routes()).use(User.allowedMethods())
// app.use(User.routes())

app.use(router.routes()); //作用：启动路由
app.use(router.allowedMethods()); // 作用： 这是官方文档的推荐用法,我们可以看到router.allowedMethods()用在了路由匹配router.routes()之后,所以在当所有路由中间件最后调用.此时根据ctx.status设置response响应头
app.listen(8081)
console.log('app start 8081')