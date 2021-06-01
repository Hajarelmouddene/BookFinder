const db = require("../db/db");

class BookstoreModel {
  async createBookstore(name, phoneNumber, address) {
    //destructure newBookstore (promise)
    const [newBookstore] = await db("bookstore")
      .insert({
        name: name,
        phone_number: phoneNumber,
        address: address,
      })
      .returning(["bookstore_id", "name", "phone_number", "address"]);

    return newBookstore;
  }
  async findBookstoreById(bookstoreId) {
    //destructure bookstore (promise)
    const [bookstore] = await db("bookstore").where(
      "bookstore_id",
      bookstoreId
    );
    return bookstore;
  }
  async findBookstoreByPhoneNumber(phoneNumber) {
    //destructure bookstore (promise)
    const [bookstore] = await db("bookstore").where(
      "phone_number",
      phoneNumber
    );
    return bookstore;
  }
}

module.exports = new BookstoreModel();
