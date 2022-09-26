let server = require("../../index");
const supertest = require("supertest");
const request = supertest(server);
const jwt = require("jsonwebtoken");

const { MSR } = require("../../modules/msrModule");

describe("/api/msr", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    await MSR.deleteMany();
    server.close();
  });

  describe("GET /:id", () => {
    it("should return the msr if valid id", async () => {
      const msr = new MSR({
        timeStamp: new Date().toISOString(),
        msrNo: "01",
        status: "Pending",
      });
      await msr.save();

      const res = await request.get("/api/view-msr/" + msr._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("status", "Pending");
    });
  });

  describe("GET /:id", () => {
    it("should return 404 if invalid id", async () => {
      const res = await request.get("/api/view-msr/1");

      expect(res.status).toBe(404);
    });
  });

  describe("GET /", () => {
    it("should return 401 if user not logged in", async () => {
      const res = await request.get("/api/view-msr/");

      expect(res.status).toBe(401);
    });
  });

  describe("GET /:id", () => {
    it("should return 200 if user logged in", async () => {
      const token = jwt.sign(
        { _id: "01", type: "Test", name: "Pamu" },
        env.JWT
      );

      const res = await request
        .get("/api/view-msr/")
        .set("x-auth-token", token);

      expect(res.status).toBe(200);
    });
  });
});
