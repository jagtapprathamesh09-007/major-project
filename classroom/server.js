const express = require ("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(session({secret : "mysupersecretsytring" ,resave:false , saveUninitialized:true}));
app.use(flash());

app.use((req, res, next) => {
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  next();
});

app.get("/" , (req,res)=>{
    res.send("test successful");
})

app.get("/reqcount" , (req,res)=>{
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count = 1;
    }

    res.send(`your reqcount is ${req.session.count} `);
})

app.get("/register", (req,res)=>{
    let {name = "empty"} = req.query;
    req.session.name = name;

if (name === "empty" || name === "") {
        req.session.name = "Anonymous";
        req.flash("error", "user not registered successfully!");
    } else {
        req.session.name = name;
        req.flash("success", "user registered successfully!");
    }
    res.redirect("/hello");
})

app.get("/hello",(req,res)=>{
    //res.send(`hello , ${req.session.name}`);
    res.render("page.ejs" , {name:req.session.name});
})

app.listen(3000 , ()=>{
    console.log("server is listing on port 3000");
});
