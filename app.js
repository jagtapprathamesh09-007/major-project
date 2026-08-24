const express = require ("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderLust";
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema , reviewSchema} = require("./schema.js");
const console = require("console");
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");


main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log("err");
});

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/", (req , res)=>{
    res.send("hii iam root ");
});
//_______________________________________________________________________________________________________________


const validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        throw (new ExpressError(400,error));
    }else{
        next();
    }
}


app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

//___________________________________________________________________

app.use("/listings" , listings);
app.use("/listings/:id/reviews", reviews);


app.all('{*splat}',(req,res,next)=>{
    return next(new ExpressError(404, "page not found!"));
});

app.use((err,req,res,next)=>{
    let{statuscode= 500,message="something went wrong!"} = err;
    res.status(statuscode).render("error.ejs" ,{message});
});


app.listen(8080 ,() =>{
    console.log("server is listing on port 8080");
});





// app.get("/testingListing" , async (req,res)=>{
//     const sampleListing = new listing({
//         title : "My new villa ",
//         description : "by the beach",
//         price : 1200,
//         location : "mumbai",
//         country : "india",
//     });

//    await sampleListing.save();
//    console.log("sample was save");
//    res.send("successful testing");
// })