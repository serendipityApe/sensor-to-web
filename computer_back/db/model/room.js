const Mongoose = require("mongoose");
//room
    var roomSchema =new Mongoose.Schema({
    name: {type:String,required: true},
    local: {type:String,required: true},
    admin: {type:String,required: true},
});
var Room = Mongoose.model('rooms',roomSchema); 
module.exports=Room;