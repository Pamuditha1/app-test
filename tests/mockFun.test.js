const fun = require("../funForTest/mockFun");
const db = require("../funForTest/db");

describe("mockFunctions", () => {
  it("should apply 10% if points more than 10", () => {
    db.getCustomer = function (customerID) {
      return { id: customerID, points: 11 };
    };
    const order = { cusID: 1, total: 100 };
    fun.applyDiscount(order);
    expect(order.total).toBe(90);
  });
});
