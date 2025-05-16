
const express = require('express');
const router = express.Router();
const Book = require('../models/book.model'); // Ensure this file exists

// POST /api/books - Add a new book
router.post('/', async (req, res) => {
  try {
    const books = await Book.find();
    const book = new Book(req.body);
    book.bookId = books.length + 1; // Auto-increment bookId (basic way)
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.error('Error saving book:', error);
    res.status(400).json({ error: 'Failed to save book', details: error.message });
  }
});

// GET /api/books - Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// GET /api/books/:id - Get a book by custom bookId
router.get('/:id', async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    const book = await Book.findOne({ bookId });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Optionally calculate average rating
    const avgRating = book.ratings.length
      ? (book.ratings.reduce((a, b) => a + b, 0) / book.ratings.length).toFixed(1)
      : null;

    res.json({ ...book._doc, avgRating });
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    res.status(500).json({ error: 'Failed to fetch book' });
  }
});

// POST /api/books/:id/rate - Submit rating and comment
router.post('/:id/rate', async (req, res) => {
  const bookId = parseInt(req.params.id);
  const { rating, comment } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  try {
    const book = await Book.findOne({ bookId });

    if (!book) return res.status(404).json({ message: 'Book not found' });

    book.ratings.push(rating);
    if (comment && comment.trim()) {
      book.feedback.push(comment.trim());
    }

    await book.save();

    res.status(200).json({ message: 'Rating submitted successfully' });
  } catch (error) {
    console.error('Error submitting rating:', error);
    res.status(500).json({ error: 'Failed to submit rating' });
  }
});

module.exports = router;












// // routes/books.js
// const express = require('express');
// const router = express.Router();
// const Book = require('../models/book.model'); // Make sure the model exists

// // POST /api/books - Add a new book
// router.post('/', async (req, res) => {
//   try {
//     const books  = await Book.find();
//     const book = new Book(req.body);
//     book.bookId = books.length + 1;
//     await book.save();
//     res.status(201).json(book);
//   } catch (error) {
//     console.error('Error saving book:', error);
//     res.status(400).json({ error: 'Failed to save book', details: error.message });
//   }
// });

// // (Optional) GET /api/books - Get all books
// router.get('/', async (req, res) => {
//   try {
//     const books = await Book.find();
//     res.json(books);
//     books.length
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch books' });
//   }
// });

// module.exports = router;
