const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

var path = require("path");
global.appRoot = path.resolve(__dirname);

const addUser = require("./routes/addUser");
const authUser = require("./routes/authUser");
const createMSR = require("./routes/createMSR");
const getMSRs = require("./routes/getMSRs");
const decideMSR = require("./routes/updateMSR");
const createPR = require("./routes/createPR");
const getPRs = require("./routes/getPRs");
const getSupplierNames = require("./routes/getSuppliers");
const addItem = require("./routes/addItem");
const getItems = require("./routes/getItems");
const updateItem = require("./routes/updateItem");
const createPO = require("./routes/createPO");
const viewPO = require("./routes/getPOs");
const updatePO = require("./routes/updatePO");
const getUsers = require("./routes/getUsers");
const updateUser = require("./routes/updateUser");
const getNo = require("./routes/getNo");
const getSEs = require("./routes/getSiteEngineers");
const createGRN = require("./routes/createGRN");
const addProject = require("./routes/addProject");
const getProjects = require("./routes/getProjects");
const createDailyUsage = require("./routes/createDailyReport");
const viewGRNs = require("./routes/getGRNs");
const viewDUs = require("./routes/getDUs");

mongoose
  .connect(
    process.env.NODE_ENV == "test"
      ? process.env.MONGO_URI_TEST
      : process.env.MONGO_URI,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => {
    console.log("Could not Connect to mongoDB", err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/register/user", addUser);
app.use("/api/login", authUser);
app.use("/api/create-msr", createMSR);
app.use("/api/view-msr", getMSRs);
app.use("/api/update-msr", decideMSR);
app.use("/api/create-pr", createPR);
app.use("/api/view-pr", getPRs);
app.use("/api/suppliers", getSupplierNames);
app.use("/api/add-item", addItem);
app.use("/api/get-items", getItems);
app.use("/api/edit-item", updateItem);
app.use("/api/create-po", createPO);
app.use("/api/view-po", viewPO);
app.use("/api/update-po", updatePO);
app.use("/api/get-users", getUsers);
app.use("/api/update-user", updateUser);
app.use("/api/get-no", getNo);
app.use("/api/site-engineers", getSEs);
app.use("/api/create-grn", createGRN);
app.use("/api/add-project", addProject);
app.use("/api/get-projects", getProjects);
app.use("/api/create-usage", createDailyUsage);
app.use("/api/view-grn", viewGRNs);
app.use("/api/view-du", viewDUs);

const defaultPort = process.env.NODE_ENV == "test" ? 3005 : 3003;
const port = process.env.PORT || defaultPort;

const server = app.listen(port, () =>
  console.log(`Listening on port ${port} ...`)
);

module.exports = server;
