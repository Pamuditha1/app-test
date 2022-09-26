const auth = require("../../middleware/authMiddleware");

const jwt = require("jsonwebtoken");

describe("auth middleware", () => {
  it("should populate req.user for valid token", () => {
    const token = jwt.sign(
      { _id: "01", type: "Test", name: "Pamu" },
      process.env.JWT
    );

    const req = {
      header: jest.fn().mockReturnValue(token),
    };
    const res = {};
    const next = jest.fn();

    auth(req, res, next);

    expect(req.user).toBeDefined();
    expect(req.user).toHaveProperty("name", "Pamu");
  });
});
