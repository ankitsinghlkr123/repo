const mongoose = require("mongoose");
require('dotenv').config();

async function dbconnect() {
    const uri = process.env.DB_URL; // Ensure this is defined in your .env file

    if (!uri) {
        console.error("MongoDB URI is undefined!");
        return;
    }

    try {
        await mongoose.connect(uri); // No need for deprecated options
        console.log("Successfully connected to MongoDB Atlas!");

    } catch (error) {
        console.error("Unable to connect to MongoDB Atlas!");
        console.error(error);
    }
}

module.exports = dbconnect;
