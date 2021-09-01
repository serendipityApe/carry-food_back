var qiniu = require("qiniu");
const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const {qiniuConfig} = require('../config')
let router = new Router();
//获取七牛云的上传凭证
router.get('/uploadToken', (ctx) => {
    let accessKey = qiniuConfig.sccessKey
    let secretKey = qiniuConfig.secretKey
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    let bucket = 'carry-food'
    //要上传的空间
    var options = {
      scope: bucket,
      returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
    };
    
    // 构建上传凭证
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken=putPolicy.uploadToken(mac);
    if(uploadToken){
        ctx.success(200,{uploadToken,resUrl:"http://qyaps31kd.hn-bkt.clouddn.com"})
    }else{
        ctx.fail(500,"获取token失败")
    }
})

router.get('/refreshToken',(ctx)=>{

})
module.exports=router