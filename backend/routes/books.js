// routes/books.js
const express = require('express');
const router = express.Router();
const Book = require('../models/book.model'); // Make sure the model exists

// POST /api/books - Add a new book
router.post('/', async (req, res) => {
  try {
    const books  = await Book.find();
    const book = new Book(req.body);
    book.bookId = books.length + 1;
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.error('Error saving book:', error);
    res.status(400).json({ error: 'Failed to save book', details: error.message });
  }
});

// (Optional) GET /api/books - Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
    books.length
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

module.exports = router;
