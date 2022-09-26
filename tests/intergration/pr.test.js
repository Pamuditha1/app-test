let server = require("../../index");
const supertest = require("supertest");
const request = supertest(server);
const jwt = require("jsonwebtoken");
var mongoose = require("mongoose");

const { PR } = require("../../modules/prModule");
let token;
let pr;
let rPR;

describe("/api/pr", () => {
  beforeEach(async () => {
    server = require("../../index");
    token = jwt.sign(
      { _id: "01", type: "Test", name: "Pamu" },
      process.env.JWT
    );

    pr = new PR({
      timeStamp: new Date().toISOString(),
      prNo: "01",
      status: "Pending",
    });
    rPR = await pr.save();
  });

  afterEach(async () => {
    await PR.deleteMany();
    server.close();
  });

  describe("GET /", () => {
    it("should return 401 if user not logged in", async () => {
      const res = await request.get("/api/view-pr/");

      expect(res.status).toBe(401);
    });

    it("should return 200 if user logged in", async () => {
      const res = await request.get("/api/view-pr/").set("x-auth-token", token);

      expect(res.status).toBe(200);
    });

    it("should return pr array", async () => {
      const pr = new PR({
        timeStamp: new Date().toISOString(),
        prNo: "01",
        status: "Pending",
      });
      await pr.save();

      const res = await request.get("/api/view-pr/").set("x-auth-token", token);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ prNo: "01" }),
          expect.objectContaining({ status: "Pending" }),
        ])
      );
    });
  });

  describe("GET /:id", () => {
    it("should return 401 if user not logged in", async () => {
      const res = await request.get("/api/view-pr/" + rPR._id);

      expect(res.status).toBe(401);
    });

    it("should return 400 if invalid id", async () => {
      const res = await request
        .get("/api/view-pr/123")
        .set("x-auth-token", token);

      expect(res.status).toBe(400);
      //expect(res.body).toMatch("Invalid Object Id");
      // expect(res.body).toHaveProperty("status", "Pending");
    });

    it("should return pr array if pr available", async () => {
      const res = await request
        .get("/api/view-pr/" + rPR._id)
        .set("x-auth-token", token);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("prNo", "01"),
        expect(res.body).toHaveProperty("status", "Pending");
    });

    it("should return 404 if pr not available", async () => {
      const id = mongoose.Types.ObjectId();

      const res = await request
        .get("/api/view-pr/" + id)
        .set("x-auth-token", token);

      expect(res.status).toBe(404);
    });
  });
});
