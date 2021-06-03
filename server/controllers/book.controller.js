const bookService = require("../services/book.service");
const { validationResult } = require("express-validator");

//Controller handles requests, deleguates to service, and communicates errors.
exports.createBook = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    //Create book, pass req.body to service layer
    const newBook = await bookService.createBook(req.body);
    res.status(201).json({
      message: "Book successfully created",
      book: newBook,
    });
  } catch (err) {
    console.log(err);
    if (err.code === 400) {
      res.status(400).json({
        status: 400,
        message: `Something went wrong creating a book entry with ISBN ${req.body.ISBN}. ${err}.`,
      });
    } else {
      res
        .status(500)
        .json(
          `Something went wrong creating a book entry with ISBN ${req.body.ISBN}`
        );
    }
  }
};
