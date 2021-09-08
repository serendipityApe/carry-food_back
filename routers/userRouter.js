const Router = require('koa-router');
const User =  require('../db/model/user');
const jwt = require('jsonwebtoken');
let router = new Router({prefix: '/users'})

router.post('/login',async (ctx,next) =>{ 
    let{phone,password}=ctx.request.body;
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
            // console.log(decoded);
            // console.log(jwt.verify(token,'access_token'))
        }else{
            ctx.fail(400,'用户名或密码错误')
        }
    }
})


module.exports=router