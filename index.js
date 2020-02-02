"use strict";
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
let router = require("./router");

mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/twitterlite", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", router);

app.listen(process.env.APP_PORT || 5000);
