const Mongoose = require("mongoose");
const Comment = require("./comment")
//map
var mapSchema =new Mongoose.Schema({
    ip: {type:String,required: true},  //ip
    targetId: {type:String,required: true},  //餐厅id
    targetName: {type:String,required: true}, //餐厅名字
    targetLocation: {type:String,required: true}, //餐厅地址
    targetPhoto: {type:String,required: true},
    // score: {type:String,required: true},   //评分
    ignore: {type: String, default: "0"},  //忽略人数
    star: {type: String, default: "0"},  //收藏人数
    pass: {type: String, default: "0"},  //吃过的人数
    comments: [
        {
        userId: {type:String,required: true},   //用户id
        score: {type:String,required: true},   //评分
        comment: {type: String, required: true},
        createTime: {type:Date, default: Date.now}
        }
    ]
},{
        // timestamps:{createdAt : 'createTime'}
});
var Map = Mongoose.model('maps',mapSchema); 
module.exports=Map;