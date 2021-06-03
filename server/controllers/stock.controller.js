const stockService = require("../services/stock.service");
const { validationResult } = require("express-validator");

//Controller handles requests, deleguates to service, and communicates errors.

exports.getBooksStock = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    //Create stock, pass req.body to service layer
    const stock = await stockService.getBooksStock(req.params.bookstoreId);
    res.status(200).json({
      message: `Books successfully retrieved for bookstore id ${req.params.bookstoreId}`,
      stock,
    });
  } catch (err) {
    if (err.code === 400) {
      res.status(400).json({
        status: 400,
        message: `Something went wrong getting all books for bookstore id ${req.params.bookstoreId}. ${err}.`,
      });
    } else {
      res
        .status(500)
        .json(
          `Something went wrong getting all books for bookstore id ${req.params.bookstoreId}`
        );
    }
  }
};

exports.getBookStock = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    //Create stock, pass req.body to service layer
    const stock = await stockService.getBookStock(
      req.params.bookstoreId,
      req.params.ISBN
    );
    res.status(200).json({
      message: `Book ISBN ${req.params.ISBN} successfully retrieved for bookstore id ${req.params.bookstoreId}`,
      stock,
    });
  } catch (err) {
    if (err.code === 400) {
      res.status(400).json({
        status: 400,
        message: `Something went wrong getting book ISBN ${req.params.ISBN} for bookstore id ${req.params.bookstoreId}. ${err}.`,
      });
    } else {
      res
        .status(500)
        .json(
          `Something went wrong getting book ISBN ${req.params.ISBN} for bookstore id ${req.params.bookstoreId}`
        );
    }
  }
};

exports.createStock = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    //Create stock, pass req.body to service layer
    const newStock = await stockService.createStock(req.body);
    res.status(201).json({
      message: "Stock entry successfully created",
      stock: newStock,
    });
  } catch (err) {
    console.log(err);
    if (err.code === 400) {
      res.status(400).json({
        status: 400,
        message: `Something went wrong creating the stock. ${err}.`,
      });
    } else if (err.code === "23505") {
      res.status(400).json({
        status: 400,
        message: `Something went wrong creating the stock. ${err.detail}`,
      });
    } else {
      res.status(500).json({
        status: 500,
        message: `Something went wrong creating the stock entry in DB. ${err.code}`,
      });
    }
  }
};

exports.deleteStock = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    //Delete stock, pass req.body to service layer
    const deletedStock = await stockService.deleteStock(req.params.stockId);
    res.status(200).json({
      message: `Stock entry with id ${req.params.stockId} successfully deleted`,
      deletedStock,
    });
  } catch (err) {
    if (err.code === 400) {
      res.status(400).json({
        status: 400,
        message: `Something went wrong deleting the stock entry with id ${req.params.stockId}. ${err}.`,
      });
    } else {
      res.status(500).json({
        status: 500,
        message: `Something went wrong deleting the stock entry with id ${req.params.stockId}.`,
      });
    }
  }
};

exports.updateStock = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    //Update stock, pass req.body to service layer
    const updatedStock = await stockService.updateStock(req.body);
    res.status(200).json({
      message: "Stock quantity was successfully updated",
      updatedStock,
    });
  } catch (err) {
    //add ifs here, use error code
    //pull find by id here and second try block.
    if (err.code === 400) {
      res.status(400).json({
        status: 400,
        message: `Something went wrong updating the stock quantity in DB. ${err}.`,
      });
    } else {
      res.status(500).json({
        status: 500,
        message: `Something went wrong updating the stock quantity in DB.`,
      });
    }
  }
};
