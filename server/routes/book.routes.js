const router = require("express").Router();
const bookController = require("../controllers/book.controller");
const authenticateJWT = require("../middlewares/auth.middleware");

router.post("/add", authenticateJWT, bookController.createBook);

module.exports = router;
