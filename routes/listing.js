const express =require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema , reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const{isLoggedin , isOwner} = require("../middleware.js");


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
router.get("/new" , isLoggedin ,(req,res)=>{
    res.render("listings/new.ejs")
})

//show route 

router.get("/:id" ,wrapAsync(async(req,res)=>{
    let {id} = req.params;
     const listing =await Listing.findById(id).populate("reviews").populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
     res.render("listings/show.ejs", {listing});
}));

//create new route 

router.post("/", isLoggedin ,wrapAsync (async (req,res,next)=>{
   const newListing = new Listing(req.body.listing);
   newListing.owner = req.user._id;
   await newListing.save();
   req.flash("success","new listing created!");
   res.redirect("/listings");
}));


//create a edit route
router.get("/:id/edit" ,isLoggedin , isOwner,wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const listing =await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", {listing});
}));

//create update route 
//this is por update the route 
// router.put("/:id" ,validateListing, wrapAsync (async(req, res)=>{
//     let {id} = req.params;
//     await Listing.findByIdAndUpdate(id , {...req.body.listing});
//     res.redirect(`/listing/${id}`);
// }));

router.put("/:id",isLoggedin , wrapAsync(async (req, res) => {
    let { id } = req.params;
    if (!req.body.listing.image.url || req.body.listing.image.url.trim() === "") {
        req.flash("success","listing edited!");
        delete req.body.listing.image;
    }

    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`); 
}));

//create a delete route 

router.delete("/:id" ,isLoggedin ,isOwner, wrapAsync (async(req,res)=>{
     let { id } = req.params;
     await Listing.findByIdAndDelete(id);
     req.flash("success","listing deleted!");
     res.redirect("/listings");
}));


module.exports = router;


    