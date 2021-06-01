const express = require("express");
const morgan = require("morgan");
const userRoutes = require("./routes/user.routes");
const bookRoutes = require("./routes/book.routes");
const bookstoreRoutes = require("./routes/bookstore.routes");
const stockRoutes = require("./routes/stock.routes");
const cron = require("node-cron");
const updateStockStatus = require("./jobs/stock_status.jobs");

const app = express();

//cron schedule runs every minute
cron.schedule("* * * * * *", () => {
  updateStockStatus();
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/auth", userRoutes);
app.use("/book", bookRoutes);
app.use("/bookstore", bookstoreRoutes);
app.use("/stock", stockRoutes);

module.exports = app;
