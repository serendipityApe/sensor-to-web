const mongoose =require('mongoose')
//authSource:通过computer库进行登录，操作computer库
mongoose.connect('localhost/computer',{ 
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
