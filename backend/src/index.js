require("dotenv").config();
const express = require("express");
require("express-async-errors");
const fileUpload = require("express-fileupload");
const router = require("./routes");
const {
  notFoundURLHandler,
  errorHandler,
} = require("./middlewares/errorhandler");

const app = express();
const port = process.env.PORT || 4000;

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
