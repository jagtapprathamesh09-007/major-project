const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DEFAULT_IMAGE_URL =
  "https://images.unsplash.com/photo-1527555197883-98e27ca0c1ea?w=1000&q=80";

const listingSchema = new Schema({
  title: {
    type: String,
  },
  description: String,
  image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default: DEFAULT_IMAGE_URL,
      set: (v) => (!v || v === "" ? DEFAULT_IMAGE_URL : v),
    },
  },
  price: Number,
  location: String,
  country: String,
  reviews :[
    {
      type : Schema.Types.ObjectId,
      ref : "Review",
    }
  ]
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;