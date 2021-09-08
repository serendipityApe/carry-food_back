const Router = require('koa-router');
const Map =  require('../db/model/map');
let router = new Router({prefix: '/map'})

//评论
router.post('/comment',async (ctx,next)=>{
    let{ip,targetId,comment,score,userId,targetName,targetLocation,targetPhoto}=ctx.request.body;
    if(!targetId || !comment || !score || !userId){
        ctx.fail(400,`值不能为空`)
    }else{
        let myComment={
            comment,
            score,
            userId
        }
        let target=await Map.find({targetId});  
        if(target.length == 0){ //不存在则先添加
            let data = await Map.insertMany({ip,targetId,targetName,targetLocation,targetPhoto,comments: myComment});
            if(data.length > 0){
                ctx.success(200,{msg:'评论成功',data})
            }else{
                ctx.fail(500,'添加数据库失败')
                console.log(data)
            }   
        }else{
            let data = await Map.updateOne({targetId},{ $push: {comments: myComment}});
            if(data.ok == 1){
                ctx.success(200,{msg:'评论成功',data})
            }else{
                ctx.fail(500,'添加数据库失败');
                console.log(data)
            }   
        }
    }
})

//查看是否有target
router.get('/checkTarget',async (ctx,next)=>{
    let {targetId} = ctx.request.body;
    try{
        let data = await Map.find({targetId});
        ctx.success(200,{data});
    }
    catch(error){
        ctx.fail(500,error)
    }
})

//获取所有ip
router.post('/getMap',async (ctx,next)=>{
    try{
        let data = await Map.find({},{ip:1});
        ctx.success(200,{data});
    }
    catch(error){
        ctx.fail(500,error)
    }
})
module.exports=router