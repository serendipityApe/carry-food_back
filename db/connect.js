const  {dbConfig} = require('../config')

const mongoose =require('mongoose')
//authSource:通过carryFood库进行登录，操作carryFood库
mongoose.connect(`mongodb://${dbConfig.user}:${dbConfig.password}@${dbConfig.ip}/carryFood?authSource=carryFood`,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
},);
//连接数据库
var db= mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',()=>{``
console.log('mongodb yes')
});
// exports