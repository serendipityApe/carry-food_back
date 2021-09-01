const Mongoose = require("mongoose");
//user
var userSchema =new Mongoose.Schema({
    phone: {type:String,required: true},  //手机号登录
    password: {type:String,required: true}, 
    initTime:{type:String,require:true},  //注册时间
    nickname:{type:String}, 
    commonAddress:{type:String},  //常用地址
    avatarUrl:{type:String,default:'/public/acquiesce_img.jpg'},
});
var user = Mongoose.model('users',userSchema); 
module.exports=user;