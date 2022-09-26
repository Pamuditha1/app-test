const fizzBuzz = require("../funForTest/exercise1");

describe("fixxbuxx", () => {
  it("should thorw error if input is not a number", () => {
    expect(() => fizzBuzz("10")).toThrow();
    expect(() => fizzBuzz(null)).toThrow();
    expect(() => fizzBuzz(undefined)).toThrow();
    expect(() => fizzBuzz({})).toThrow();
    expect(() => fizzBuzz([])).toThrow();
  });

  it("should return FizzBuzz if by 3 & 5", () => {
    const result = fizzBuzz(15);
    expect(result).toBe("FizzBuzz");
  });

  it("should return FizzBuzz if by 3", () => {
    const result = fizzBuzz(9);
    expect(result).toBe("Fizz");
  });

  it("should return FizzBuzz if by 5", () => {
    const result = fizzBuzz(10);
    expect(result).toBe("Buzz");
  });

  it("should return input if not", () => {
    const result = fizzBuzz(7);
    expect(result).toBe(7);
  });
});
