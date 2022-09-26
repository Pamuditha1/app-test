const db = require("./db");

module.exports.applyDiscount = function (order) {
  const customer = db.getCustomer(order.cusID);

  if (customer.points > 10) order.total *= 0.9;
};
