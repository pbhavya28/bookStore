const express = require("express");
const router = express.Router();
const Book = require("../models/book.model");

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
