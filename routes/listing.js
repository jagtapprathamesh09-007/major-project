const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedin, isOwner } = require("../middleware.js");
const listingcontroller = require("../controllers/listing.js");

// Multer setup
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// ha aapla index route aahe
//create new route
router
  .route("/")
  .get(wrapAsync(listingcontroller.index))
  .post(
    isLoggedin,
    upload.single("listing[image]"),
    wrapAsync(listingcontroller.createListing),
  );

//create new route
router.get("/new", isLoggedin, listingcontroller.renderNewForm);

// Show, Update & Delete Route
router
  .route("/:id")
  .get(wrapAsync(listingcontroller.showListing))
  .put(
    isLoggedin,
    isOwner,
    upload.single("listing[image]"),
    wrapAsync(listingcontroller.updateListing),
  )
  .delete(isLoggedin, isOwner, wrapAsync(listingcontroller.destroyListing));

//create a edit route
router.get(
  "/:id/edit",
  isLoggedin,
  isOwner,
  wrapAsync(listingcontroller.renderEditForm),
);

module.exports = router;
