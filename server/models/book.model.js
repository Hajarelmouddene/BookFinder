const db = require("../db/db");

class BookModel {
  async createBook(ISBN, bookName, authorName) {
    //destructure newBook (promise)
    const [newBook] = await db("book")
      .insert({
        isbn: ISBN,
        book_name: bookName,
        author_name: authorName,
      })
      .returning(["isbn", "book_name", "author_name"]);

    return newBook;
  }
  async findBookById(ISBN) {
    //destructure book (promise)
    const [book] = await db("book").where("isbn", ISBN);
    return book;
  }
}

module.exports = new BookModel();
