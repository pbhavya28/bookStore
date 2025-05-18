const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  bookId: {type : Number,required: true},
  title: { type: String, required: true },
  author: { type: String, required: true },
  publisher: String,
  publishDate: Date,
  edition: String,
  isbn: String,
  language: String,
  pages: { type: Number, min: 1 },
  price: { type: Number, min: 0 },
  currency: { type: String, default: 'USD' },
  category: String,
  description: String,
  coverImage: String,
  downloadLink: String,
  images: [String],
  ratings: [Number],
  feedback: [String],
  exploreMore: [String],
  tags: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
