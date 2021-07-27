const Mongoose = require("mongoose");
//temp
    var tempSchema =new Mongoose.Schema({
    temp: {type:String,required: true},
    now:{type:String,require:true}
});
var temp = Mongoose.model('temps',tempSchema); 
module.exports=temp;