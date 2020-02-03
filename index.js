"use strict";
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
let router = require("./router");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition : {
    info : {
      title : 'Api Clone - ',
      description : "TWITTER API ENDPOINTS INFORMATION",
      contact : {
        name : "Nurudeen Ajayi"
      },
      servers: ["http://localhost:8040"]
    }
  },
  apis : ["router.js"]
};
mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/twitterlite", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

const app = express();

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// /**
//  * @swagger
//  * /timeline:
//  *  get:
//  *    description : Use to get all user timeline
//  *    responses: 
//  *      '200':
//  *        description: A successful response 
//  */
// app.get("/customers", (req, res) => {
//   res.send('Customer results');
// })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", router);

app.listen(process.env.APP_PORT || 5000);
