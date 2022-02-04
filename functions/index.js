const functions = require("firebase-functions");

// const admin = require('firebase-admin');
// admin.initializeApp(functions.config().firebase);


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

// ##### not needed to serve index.html anymore for a single page app (configured firebase.json) #####
// const path = require('path');
// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/*', (req, res) => {
//     res.set('Cache-control', 'public, max-age=300, s-maxage=600');
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


// need to have inclucde full source (/api/...) to access it from firebase hosting
// app.get('/data', (req, res) => {
//     console.log('aaaaa')
//     res.set('Cache-control', 'public, max-age=300, s-maxage=600')
//     res.json('data')
// });

// app.get('/api/data', (req, res) => {
//     console.log('bbbbb')
//     res.set('Cache-control', 'public, max-age=300, s-maxage=600')
//     res.json('data /api/data')
// });

// const router = require("express").Router();

// router.get("/api", (req, res) => {
//     res.send(`here is /api`)
//   })
  
//   router.get("/data", (req, res) => {
//     res.send(`here is /data`)
//   })
  
//   router.get("/", (req, res) => {
//     res.send(`here is /`)
//   })

// app.use("/api", router)


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