var express=require("express");
var app=express();
var mongoose=require("mongoose");
var body=require("body-parser");
var authors=require("./authors");
var books=require("./books");
var category=require("./category");
var publisher=require("./publisher");
var LoginInfo=require("./user");
app.set("view engine","ejs");
mongoose.connect("mongodb://localhost/OnlineBookStr",{useNewUrlParser:true,useUnifiedTopology: true});
app.use(body.urlencoded({extended:true}));
app.use(express.static('views'));
app.use(express.static('node_modules'));
//-------------------------------------------------------------------------------------------------------
app.listen(5000,function(req,res){
console.log("Server Started");
});
//----------------------------------------------------------------------------------------------------
app.get("/home",function(req,res){
	res.render("home");
});
//----------------------------------------------------------------------------------------------------
app.get("/searchbygenre",function(req,res){
res.render("searchbygenre");
})
app.post("/searchbygenre",function(req,res){
Category=req.body.Category;
books.find({"Category":new RegExp(Category,'i')},
        function(error,me){
			console.log(me);
			if(error || !me){
				res.render("booksAvailable",{});
			}else{

	            res.render("booksAvailable",{me:me});
			}   
	//});
});
});
//----------------------------------------------------------------------------------------------------
app.get("/searchbyauthor",function(req,res){
res.render("searchbyauthor");
})
app.post("/searchbyauthor",function(req,res){
author=req.body.author;
books.find({"author":new RegExp(author,'i')},
    function(error,me){
		console.log(me);
		if(error || !me){
			res.render("booksAvailable",{});
		}else{

			res.render("booksAvailable",{me:me});
		} 
});
});
//----------------------------------------------------------------------------------------------------
app.get("/searchbyname",function(req,res){
res.render("searchbyname");
})
app.post("/searchbyname",function(req,res){
title=req.body.title;
books.find({"title":new RegExp(title,'i')},
   function(error,me){
	console.log(me);
		if(error || !me){
			res.render("booksAvailable",{});
		}else{

			res.render("booksAvailable",{me:me});
		} 
});
});
//----------------------------------------------------------------------------------------------------
app.get("/login",function(req,res){
res.render("login");
});
app.post("/login",async function(req,res){
mail=req.body.mail; 
password=req.body.password;
LoginInfo.findOne({mail:mail},function(error,me){
	if(error || !me){
		res.status(204).send("<div align ='center'><h2>Invalid Mail-Id</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./login.html'>Try again!</a></div>");
	}
	else{
		if(me.password===password){
			res.render("home");
		}
		else{
			res.status(200).send("<div align ='center'><h2>Invalid password</h2></div><br><br><div align='center'><a href='./login'>login</a></div><br><br><div align='center'><a href='./login'>Try again!</a></div>");
		}
	}
});
});
//------------------------------------------------
app.get("/signin",function(req,res){
res.render("signin");
});
app.post("/signin",function(req,res){
username=req.body.uname;
password=req.body.password;
mail=req.body.mail;
user.find({},function(err,me){
	user.create(new user({"username":username,"password":password,"mail":mail}),function(err,user){
		if(err){
			console.log("something fishy");
		}
		else{
			console.log("registered successfully");
			res.render("login");
		}

	});

});
});