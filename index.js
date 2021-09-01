const Koa = require('koa');
const cors = require('koa2-cors')
const app=new Koa();
const router = require('koa-router')();
const mongoose = require('mongoose')
var bodyParser= require('koa-bodyparser'); 
const jwt=require('koa-jwt')
const db=require('./db/connect')
let routerResponse =  require('./middleware/ResConfig')

const Room =  require('./routers/roomRouter')
const User =  require('./routers/userRouter')
const Utils = require('./routers/utilsRouter')
app.use(bodyParser()); 
app.use(cors({
    origin: function(ctx) { //设置允许来自指定域名请求
        if (ctx.url === '/test') {
            return '*'; // 允许来自所有域名请求
        }
        return 'http://localhost:3000'; //只允许http://localhost:8080这个域名的请求
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
}))
app.use(routerResponse())
let flag=false;   //是否应该刷新token
//全局token错误处理
app.use(function(ctx, next){
    return next().then(()=>{
      if(flag){
        ctx.append('myType','refreshToken')
      }
    }).catch((err) => {
      if (401 == err.status) {
        ctx.status = 401;
        ctx.body = 'Protected resource, use Authorization header to get access\n';
      } else {
        throw err;
      }
    });
  });

// 该中间件下方路由才有效
app.use(jwt({ 
    secret: 'access_token',
}).unless({
    path:[/^\/public/,/\/users\/login/]  //配置白名单 \/为/转义
}));

/* //尝试双token,判断access阈值(是否快过期)
app.use(
  jwt({ 
    secret: (hearder,payload) =>{
      console.log(payload);
      if((payload.exp-payload.iat) / (payload.exp-Date.now()/1000) > 20){
        flag=true;
      }
      console.log((payload.exp-payload.iat) / (payload.exp-Date.now()/1000))
      //如果过期,返回refreshToken
      return 'access_token'
    },
  }).unless({
    path:[/^\/public/,/\/users\/login/]  //配置白名单 \/为/转义
  })
); */

app.use(User.routes()).use(User.allowedMethods())
app.use(Utils.routes()).use(Utils.allowedMethods())
// app.use(User.routes())

app.use(router.routes()); //作用：启动路由
app.use(router.allowedMethods()); // 作用： 这是官方文档的推荐用法,我们可以看到router.allowedMethods()用在了路由匹配router.routes()之后,所以在当所有路由中间件最后调用.此时根据ctx.status设置response响应头
app.listen(8081)
console.log('app start 8081')