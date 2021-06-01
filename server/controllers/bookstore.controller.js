const bookstoreService = require("../services/bookstore.service");
// TODO: add req.body validation

//Controller handles requests, deleguates to service, and communicates errors.
exports.createBookstore = async (req, res) => {
  try {
    //Create bookstore, pass req.body to service layer
    const newBookstore = await bookstoreService.createBookstore(req.body);
    res.status(201).json({
      message: "Bookstore successfully created",
      bookstore: newBookstore,
    });
  } catch (err) {
    if (err.code === 400) {
      res.status(400).json({
        status: 400,
        message: `Something went wrong creating a bookstore entry with phone number ${req.body.phoneNumber}. ${err}.`,
      });
    } else {
      res
        .status(500)
        .json(
          `Something went wrong creating a bookstore entry with phone number ${req.body.phoneNumber}.`
        );
    }
  }
};

//TODO: when using dependency injection export an instance of BookstoreController
// module.exports = new BookstoreController();
