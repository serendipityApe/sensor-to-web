const Mongoose = require("mongoose");
//user
    var userSchema =new Mongoose.Schema({
    user: {type:String,required: true},
    now:{type:String}
});
var user = Mongoose.model('users',userSchema); 
module.exports=user;