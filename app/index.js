const express = require("express");
const morgan = require("morgan");
const router = require("../config/routes");
const cors = require("cors");
const app = express();
app.use(express.static("public"));

require("dotenv").config();

// install cors
app.use(cors());

/** Install request logger */
app.use(morgan("dev"));

/** Install body parser */
app.use(express.urlencoded({ extended: true }));

/** Install JSON request parser */
app.use(express.json());

/** Install Router */
app.use(router);

module.exports = app;
