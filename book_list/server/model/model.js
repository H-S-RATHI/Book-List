const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  book: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  year: {
    type: Date,
    required: true,
  },
  isbn: {
    type: Number,
    required: true,
  },
});

const BookDb = mongoose.model("BookDb", schema);

module.exports = BookDb;
