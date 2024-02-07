const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["enable", "disable"], default: "enable" },
});
module.exports = mongoose.model("Books", BookSchema);
//here books is name of collection and bookschema is schema for it
