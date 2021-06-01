const db = require("../db/db");

class StockModel {
  async getBooksStock(bookstoreId) {
    //resulting books for bookstoreId stored in an array of objects (response of select call)
    const booksStock = await db("stock")
      .where("bookstore_id", bookstoreId)
      .select();

    return booksStock;
  }

  async getBookStock(bookstoreId, ISBN) {
    //destructure booksStock (promise)
    const [bookStock] = await db("stock")
      .where({
        bookstore_id: bookstoreId,
        isbn: ISBN,
      })
      .select();

    return bookStock;
  }

  async createStock(ISBN, bookstoreId, quantity) {
    //destructure newStock (promise)
    const [newStock] = await db("stock")
      .insert({
        isbn: ISBN,
        bookstore_id: bookstoreId,
        quantity: quantity,
        status: "in stock",
      })
      .returning(["stock_id", "bookstore_id", "isbn", "quantity", "status"]);

    return newStock;
  }

  async deleteStock(stockId) {
    //destructure deletedStock (promise)
    const [deletedStock] = await db("stock")
      .where("stock_id", stockId)
      .del()
      .returning(["stock_id", "bookstore_id", "isbn", "quantity", "status"]);

    return deletedStock;
  }

  async updateStock(stockId, quantity) {
    //destructure updatedStock (promise)
    const [updatedStock] = await db("stock")
      .where("stock_id", stockId)
      .update({
        quantity: quantity,
        status: "in stock",
      })
      .returning(["stock_id", "bookstore_id", "isbn", "quantity", "status"]);

    return updatedStock;
  }

  async findStockById(stockId) {
    //destructure stock (promise)
    const [stock] = await db("stock").where("stock_id", stockId);
    return stock;
  }
}

module.exports = new StockModel();
