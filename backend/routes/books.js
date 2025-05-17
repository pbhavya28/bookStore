const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Book = require('../models/book.model'); // Ensure the model exists


router.post("/", async (req, res) => {
  try {
    const books = await Book.find();
    const book = new Book(req.body);
    book.bookId = books.length + 1;
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.error("Error saving book:", error);
    res
      .status(400)
      .json({ error: "Failed to save book", details: error.message });
  }
});


router.get('/explore-more/:id', async (req, res) => {
  try {
    const currentBookId = parseInt(req.params.id, 10); 
    console.log('Current Book ID:', currentBookId); 

   
    const books = await Book.aggregate([
      { $match: { bookId: { $ne: currentBookId } } }, 
      { $sample: { size: 8 } }, 
    ]);

    console.log('Related Books:', books); 
    res.json(books);
  } catch (err) {
    console.error('Error fetching related books:', err); 
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const bookId = req.params.id;

   
    const book = await Book.findOne({ bookId: parseInt(bookId) }); // Ensure bookId is a number
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
  } catch (err) {
    console.error('Error fetching book:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:id/rate', async (req, res) => {
  try {
    console.log('Headers received:', req.headers); 
    console.log('Payload received:', req.body); 

    const { rating, comment } = req.body;
    const username = req.headers['username'] || 'Anonymous';

    if (!rating || !comment) {
      return res.status(400).json({ error: 'Rating and comment are required.' });
    }

    const book = await Book.findById(req.params.id);
    console.log('Book retrieved from database:', book); // Debugging

    if (!book) {
      return res.status(404).json({ error: 'Book not found.' });
    }

    
    if (!book.ratings) {
      book.ratings = [];
    }
    if (!book.feedback) {
      book.feedback = [];
    }

    book.ratings.push(rating);
    book.feedback.push(JSON.stringify({ username, rating, comment }));

    await book.save();
    res.json(book);
  } catch (err) {
    console.error('Error in /rate endpoint:', err); 
    res.status(500).json({ error: 'Server error.' });
  }
});


// router.get('/', async (req, res) => {
//   try {
//     const books = await Book.find();
//     res.json(books);

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
    books.length;
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

router.delete("/:bookId", async (req, res) => {
  const { bookId } = req.params;

  try {
    const deletedBook = await Book.findOneAndDelete({
      bookId: parseInt(bookId),
    });

    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({ message: "Book deleted successfully", book: deletedBook });

  } catch (error) {
    console.error("Error deleting book:", error);
    res
      .status(500)
      .json({ error: "Failed to delete book", details: error.message });
  }
});

module.exports = router;