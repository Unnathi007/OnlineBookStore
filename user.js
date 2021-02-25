var mongoose =require("mongoose");
var u_schema=mongoose.Schema({
	username:String,
	password:String,
	mail:String
});
var LoginInfo=mongoose.model("LoginInfo",u_schema,"LoginInfo");
module.exports=LoginInfo;