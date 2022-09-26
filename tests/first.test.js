const first = require("../funForTest/first");

describe("absolute", () => {
  it("should return a positive num if input is positive", () => {
    const result = first.absolute(1);
    expect(result).toBe(1);
  });

  it("should return a positive num if input is negative", () => {
    const result = first.absolute(-1);
    expect(result).toBe(1);
  });

  it("should return 0 if input is 0", () => {
    const result = first.absolute(0);
    expect(result).toBe(0);
  });
});

describe("welcome", () => {
  it("should return greeting message", () => {
    const result = first.stringFun("Pamu");
    expect(result).toContain("Pamu");
  });
});

describe("array", () => {
  it("should return num array", () => {
    const result = first.arrayFun();

    expect(result).toEqual(expect.arrayContaining(["one", "two", "three"]));
  });
});

describe("object", () => {
  it("should return object", () => {
    const result = first.object(10);
    expect(result).toEqual({ id: 10, value: 100 });
    expect(result).toMatchObject({ id: 10, value: 100 });
    expect(result).toHaveProperty("value", 100);
  });
});

describe("exception", () => {
  it("should return exception if name falsy", () => {
    const args = [null, undefined, NaN, "", 0, false];
    args.forEach((a) => {
      expect(() => {
        first.exception(a);
      }).toThrow();
    });
  });

  it("should return name", () => {
    const result = first.exception("Pamu");
    expect(result).toMatchObject({ name: "Pamu" });
    expect(result.id).toBeGreaterThan(0);
  });
});
