const express =require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema , reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {validateReview, isLoggedin} = require("../middleware.js");
const { isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/review.js");


//reviews route
//post route

router.post("/", isLoggedin,validateReview , wrapAsync (reviewController.createReview));

// Delete Review Route 
router.delete(
  "/:reviewId",
  isLoggedin ,isReviewAuthor ,wrapAsync(reviewController.destroyRoute));

module.exports = router;
