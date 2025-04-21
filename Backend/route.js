// const mongoose = require("mongoose");
// require('dotenv').config();

// async function dbconnect() {
//     const uri = process.env.DB_URL; // Ensure this is defined in your .env file

//     if (!uri) {
//         console.error("MongoDB URI is undefined!");
//         return;
//     }

//     try {
//         await mongoose.connect(uri); // No need for deprecated options
//         console.log("Successfully connected to MongoDB Atlas!");

//     } catch (error) {
//         console.error("Unable to connect to MongoDB Atlas!");
//         console.error(error);
//     }
// }

// module.exports = dbconnect;
const express = require("express");
const router = express.Router();
const {
  getItems, addItem, updateItem, deleteItem
} = require("./controller");

router.get("/", getItems);
router.post("/", addItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

module.exports = router;
