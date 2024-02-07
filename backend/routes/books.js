const express = require("express");
const router = express.Router();
const Books = require("../models/books");
const { format } = require("date-fns");
const curd = new Date();
const today = format(curd, "yyyy-MM-dd");
router.post("/register", async (req, res) => {
  try {
    const newBook = await Books.create({
      name: req.body.name,
      author: req.body.author,
      price: req.body.price,
      date: today,
    });
    res.json({ success: true, Books: newBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "server error" });
  }
});

router.get("/viewbook", async (req, res) => {
  try {
    const books = await Books.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Corrected the status code
  }
});

router.get("/viewbook/:id", async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "unable to show" });
  }
});
router.put("/updatebook/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the book ID from the request parameters
    const { name, author, price } = req.body; // Extract book data from the request body

    // Update the book using findByIdAndUpdate method
    const updatedBook = await Books.findByIdAndUpdate(
      id,
      {
        name: name,
        author: author,
        price: price,
      },
      { new: true }
    ); // Set { new: true } to return the updated document

    if (!updatedBook) {
      return res.status(404).json({ success: false, error: "Book not found" });
    }

    // Return the updated book in the response
    res.json({ success: true, book: updatedBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});
router.delete("/deletebook/:id", async (req, res) => {
  try {
    const book = await Books.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "unable to show" });
  }
});

router.delete("/deletebook/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the book ID from the request parameters

    // Find the book by ID and delete it
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ success: false, error: "Book not found" });
    }

    // Return success message if the book is successfully deleted
    res.json({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
