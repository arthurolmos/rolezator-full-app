const express = require("express");
const cors = require("cors");
const errorHandler = require("../middlewares/error-handler");

const routes = require("../routes");
const app = express();

app.use(cors());
app.use(express.json());
routes(app);
app.use(errorHandler);

module.exports = app;
