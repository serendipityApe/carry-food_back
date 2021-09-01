const Router = require('koa-router');
const User =  require('../db/model/user');
const jwt = require('jsonwebtoken');
let router = new Router({prefix: '/users'})
const cookieConfig = {
    maxAge: 1000 * 60 * 60 * 24 * 7,            // 一个数字表示从 Date.now() 得到的毫秒数
    expires: new Date('2019-03-08'),        // 过期的 Date,如不设置就和session类似，关闭浏览器此cookie失效
    path: '/',                  // 路径, 默认是'/'
    domain: 'localhost',                // 域名
    secure: false,              // 安全 cookie   默认false，设置成true表示只有 https可以访问
    httpOnly: true,            // 是否只是服务器可访问 cookie, 默认是 true
    overwrite: true             // 一个布尔值，表示是否覆盖以前设置的同名的 cookie (默认是 false). 如果是 true, 在同一个请求中设置相同名称的所有 Cookie（不管路径或域）是否在设置此Cookie 时从 Set-Cookie 标头中过滤掉。
}

router.post('/login',async (ctx,next) =>{ 
    let{phone,password}=ctx.request.body;
    console.log(ctx.request.body)
    if(!phone || !password){
        ctx.fail(400,'值不能为空')
    }else{
        let goLogin=await User.find({phone,password})
        if(goLogin.length>=1){
            // console.log(goLogin)
            const token = jwt.sign({
                id:goLogin[0]._id
            },'access_token', { expiresIn: '2d' });
            // ctx.cookies.set('access_token',token)
            ctx.success(200,{data:goLogin[0],token})
            var decoded = jwt.decode(token, {complete: true});
console.log(decoded);
            // console.log(jwt.verify(token,'access_token'))
        }else{
            ctx.fail(400,'用户名或密码错误')
        }
    }
})


module.exports=router