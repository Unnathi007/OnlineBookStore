var mongoose=require("mongoose");
var c_schema=mongoose.Schema({
	Category:String
})
var Category=mongoose.model("Category",c_schema);
module.exports=Category;