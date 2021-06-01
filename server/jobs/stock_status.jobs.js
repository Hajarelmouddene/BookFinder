//Method called every minute to check whether a book's inventory is depleted
//Updates the status to be "out of stock" for books that have a stock level of 0.
const db = require("../db/db");
const updateStockStatus = async (req, res) => {
  try {
    const numberOfEntriesUpdated = await db("stock")
      .where("quantity", 0)
      .select()
      .update({ status: "out of stock" });
    //.update returns number of records updated
    return numberOfEntriesUpdated;
  } catch (err) {
    res
      .status(500)
      .json("Something went wrong run the update stock status job");
  }
};

module.exports = updateStockStatus;
