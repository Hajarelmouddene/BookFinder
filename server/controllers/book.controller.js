const bookService = require("../services/book.service");
// TODO: add req.body validation

//Controller handles requests, deleguates to service, and communicates errors.
exports.createBook = async (req, res) => {
  try {
    //Create book, pass req.body to service layer
    const newBook = await bookService.createBook(req.body);
    res.status(201).json({
      message: "Book successfully created",
      book: newBook,
    });
  } catch (err) {
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

//TODO: when using dependency injection export an instance of UserController
// module.exports = new BookController();
