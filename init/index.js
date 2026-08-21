const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderLust";

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDb = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("Data was initialized successfully!");
};


main()
  .then(async () => {
    console.log("Connected to DB");
    await initDb();
    mongoose.connection.close(); 
  })
  .catch((err) => {
    console.log("DB Connection Error:", err);
  });