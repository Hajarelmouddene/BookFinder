const bookModel = require("../models/book.model");
class BookService {
  async createBook(bookDto) {
    //destructure req.body passed from book controller to book service
    const { ISBN, bookName, authorName } = bookDto;
    //check if isbn exists in book table, if it does throw error.
    const book = await bookModel.findBookById(ISBN);
    if (book) {
      const err = new Error(`Book with ISBN ${ISBN} exists already`);
      err.code = 400;
      throw err;
    }
    // pass req.body to bookModel; return (promise)
    return bookModel.createBook(ISBN, bookName, authorName);
  }
}

module.exports = new BookService();
