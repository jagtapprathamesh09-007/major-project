const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedin, isOwner } = require("../middleware.js");
const listingcontroller = require("../controllers/listing.js");

// ha aapla index route aahe
//create new route
router
  .route("/")
  .get(wrapAsync(listingcontroller.index))
  .post(isLoggedin, wrapAsync(listingcontroller.createListing));

//create new route
router.get("/new", isLoggedin, listingcontroller.renderNewForm);

// Show, Update & Delete Route
router
  .route("/:id")
  .get(wrapAsync(listingcontroller.showListing))
  .put(isLoggedin, wrapAsync(listingcontroller.updateListing))
  .delete(isLoggedin, isOwner, wrapAsync(listingcontroller.destroyListing));


//create a edit route
router.get(
  "/:id/edit",
  isLoggedin,
  isOwner,
  wrapAsync(listingcontroller.renderEditForm),
);


module.exports = router;
