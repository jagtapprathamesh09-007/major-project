const express =require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema , reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const{isLoggedin , isOwner} = require("../middleware.js");
const listingcontroller = require("../controllers/listing.js");


// ha aapla index route aahe 

router.get("/",wrapAsync(listingcontroller.index) );

//___________________________________________________________________

//create new route 
router.get("/new" , isLoggedin ,listingcontroller.renderNewForm);

//show route 

router.get("/:id" ,wrapAsync(listingcontroller.showListing));

//create new route 

router.post("/", isLoggedin ,wrapAsync (listingcontroller.createListing));


//create a edit route
router.get("/:id/edit" ,isLoggedin , isOwner,wrapAsync(listingcontroller.renderEditForm));

//create update route 

router.put("/:id",isLoggedin , wrapAsync(listingcontroller.updateListing));

//create a delete route 

router.delete("/:id" ,isLoggedin ,isOwner, wrapAsync (listingcontroller.destroyListing));

module.exports = router;


    