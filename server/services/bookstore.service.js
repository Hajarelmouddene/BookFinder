const bookstoreModel = require("../models/bookstore.model");
class BookstoreService {
  async createBookstore(bookstoreDto) {
    //destructure req.body passed from bookstore controller to bookstore service
    const { bookstoreName, phoneNumber, address } = bookstoreDto;
    //check if bookstore exists in bookstore table, if it does throw error.
    const bookstore = await bookstoreModel.findBookstoreByPhoneNumber(
      phoneNumber
    );
    if (bookstore) {
      const err = new Error(
        `Bookstore with phone number ${phoneNumber} exists already`
      );
      err.code = 400;
      throw err;
    }
    // pass req.body to bookstoreModel; return (promise)
    return bookstoreModel.createBookstore(bookstoreName, phoneNumber, address);
  }
}

module.exports = new BookstoreService();
