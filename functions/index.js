const functions = require("firebase-functions");

const admin = require("firebase-admin");

// enable for local firebase serve
// const serviceAccount = require("../ecommerce-backend-firebase-adminsdk.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });


admin.initializeApp();


// ######### Cross platform firebase.json lint command #######
// https://stackoverflow.com/questions/48345315/error-deploying-with-firebase-on-npm-prefix-resource-dir-run-lint
// "npm --prefix ./functions/ run lint"


// TODO
// scripts to clean up build files


// host express app
const express = require("express");
const app = express();

// add routing
const apiRoute = require("./api/routes/data");

app.use("/api", apiRoute);

// not needed to serve index.html for a single page app (configured firebase.json)

exports.app = functions.https.onRequest(app);


// test cloud functions
exports.bigben = functions.https.onRequest((req, res) => {
    const hours = (new Date().getHours() % 12) + 1  // London is UTC + 1hr;
    res.status(200).send(`<!doctype html>
      <head>
        <title>Time</title>
      </head>
      <body>
        ${'BONG '.repeat(hours)}
      </body>
    </html>`);
  });