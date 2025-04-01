const mongoose = require("mongoose");


const userschema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
      },
    
      password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
      },
  })

  module.exports = mongoose.model.Users || mongoose.model("Users", userschema);