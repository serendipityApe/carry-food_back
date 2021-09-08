const Mongoose = require("mongoose");
//comment
var commentSchema =new Mongoose.Schema({
    userId: {type:String,required: true},   //用户id
    score: {type:String,required: true},   //评分
    comment: {type: String, required: true},
    createTime: {type:Date}
},{
    timestamps:{createdAt : 'createTime'}
});
var Comment = Mongoose.model('comments',commentSchema); 
module.exports=Comment;