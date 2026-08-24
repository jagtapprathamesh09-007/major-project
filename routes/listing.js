const express =require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema , reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");


const validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        throw (new ExpressError(400,error));
    }else{
        next();
    }
}

// ha aapla index route aahe 

router.get("/" ,  async(req,res)=>{
    const AllListing = await Listing.find({});
    res.render("listings/index.ejs" , {AllListing});
});

//___________________________________________________________________

//create new route 
router.get("/new" , (req,res)=>{
    res.render("listings/new.ejs")
})

//show route 

router.get("/:id" ,wrapAsync(async(req,res)=>{
    let {id} = req.params;
     const listing =await Listing.findById(id).populate("reviews");;
     res.render("listings/show.ejs", {listing});
}));

//create new route 

router.post("/", wrapAsync (async (req,res,next)=>{
   const newListing = new Listing(req.body.listing);
   await newListing.save();
   res.redirect("/listings");
}));


//create a edit route
router.get("/:id/edit" , wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const listing =await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
}));

//create update route 
//this is por update the route 
// app.put("/listings/:id" , async(req, res)=>{
//     let {id} = req.params;
//     await listing.findByIdAndUpdate(id , {...req.body.listing});
//     res.redirect(`/listing/${id}`);
// });

router.put("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    if (!req.body.listing.image.url || req.body.listing.image.url.trim() === "") {
        delete req.body.listing.image;
    }

    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`); 
}));

//create a delete route 

router.delete("/:id" , wrapAsync (async(req,res)=>{
     let { id } = req.params;
     await Listing.findByIdAndDelete(id);
     res.redirect("/listings");
}));


module.exports = router;