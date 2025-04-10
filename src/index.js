require("dotenv").config();
const express = require("express");
require("express-async-errors");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const router = require("../src/routes/index");
const {
  notFoundURLHandler,
  errorHandler,
} = require("../src/middlewares/errorHandler");

const app = express();
const port = process.env.PORT || 4100;

app.use(cors());

app.use(express.json());
app.use(fileUpload());

app.use("/", router);
app.use("*", notFoundURLHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(
    `express.js app is runnning on port ${port} || http://localhost:${port}`
  );
});
