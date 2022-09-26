module.exports.absolute = function (num) {
  if (num > 0) return num;
  if (num < 0) return -num;
  return 0;
};

module.exports.stringFun = function (str) {
  return `Welcome ${str}`;
};

module.exports.arrayFun = function () {
  return ["one", "two", "three"];
};

module.exports.object = function (id) {
  const value = id * 10;
  return { id, value };
};

module.exports.exception = function (name) {
  if (!name) throw new Error("Name not defined");

  return { id: new Date().getTime(), name };
};
