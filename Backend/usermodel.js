const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  person: { type: String, required: true },
  type: { type: String, enum: ["Lent", "Borrowed"], required: true },
  status: { type: String, enum: ["Pending", "Returned"], default: "Pending" },
  dateGiven: { type: Date, required: true },
  expectedReturnDate: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Item", itemSchema);