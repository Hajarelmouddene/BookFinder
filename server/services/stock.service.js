const stockModel = require("../models/stock.model");
const bookModel = require("../models/book.model");
const bookstoreModel = require("../models/bookstore.model");
class StockService {
  async getBooksStock(bookstoreId) {
    //check if bookstore exists in bookstore table, if not throw error.
    const bookstore = await bookstoreModel.findBookstoreById(bookstoreId);
    if (!bookstore) {
      const err = new Error(`Bookstore with id ${bookstoreId} does not exist`);
      err.code = 400;
      throw err;
    }
    // pass req.params to stockModel; return (promise)
    return stockModel.getBooksStock(bookstoreId);
  }

  async getBookStock(bookstoreId, ISBN) {
    //check if isbn exists in book table, if not throw error.
    const book = await bookModel.findBookById(ISBN);

    if (!book) {
      const err = new Error(`Book with ISBN ${ISBN} does not exist`);
      err.code = 400;
      throw err;
    }
    //check if bookstore exists in bookstore table, if not throw error.
    const bookstore = await bookstoreModel.findBookstoreById(bookstoreId);
    if (!bookstore) {
      const err = new Error(`Bookstore with id ${bookstoreId} does not exist`);
      err.code = 400;
      throw err;
    }
    // pass req.params to stockModel; return (promise)
    return stockModel.getBookStock(bookstoreId, ISBN);
  }

  async createStock(stockDto) {
    //destructure req.body passed from stock controller to stock service
    const { ISBN, bookstoreId, quantity } = stockDto;
    //check if isbn exists in book table, if not throw error.
    const book = await bookModel.findBookById(ISBN);

    if (!book) {
      const err = new Error(`Book with ISBN ${ISBN} does not exist`);
      err.code = 400;
      throw err;
    }
    //check if bookstore exists in bookstore table, if not throw error.
    const bookstore = await bookstoreModel.findBookstoreById(bookstoreId);
    if (!bookstore) {
      const err = new Error(`Bookstore with id ${bookstoreId} does not exist`);
      err.code = 400;
      throw err;
    }
    // pass req.body to stockModel; return (promise)
    return stockModel.createStock(ISBN, bookstoreId, quantity);
  }

  async deleteStock(stockId) {
    //check if stock id exists, if not throw error.
    const stock = await stockModel.findStockById(stockId);
    if (!stock) {
      const err = new Error(`Stock with id ${stockId} does not exist`);
      err.code = 400;
      throw err;
    }
    // pass req.params to stockModel; return (promise)
    return stockModel.deleteStock(stockId);
  }

  async updateStock(stockDto) {
    //destructure req.body passed from stock controller to stock service
    const { stockId, quantity } = stockDto;
    //check if stock id exists, if not throw error.
    const stock = await stockModel.findStockById(stockId);
    if (!stock) {
      const err = new Error(`Stock with id ${stockId} does not exist`);
      err.code = 400;
      throw err;
    }
    // pass req.body to stockModel; return (promise)
    return stockModel.updateStock(stockId, quantity);
  }
}

module.exports = new StockService();
