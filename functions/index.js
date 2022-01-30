const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions


// ######### Cross platform firebase.json command #######
// Powershell or cmd Deployment
// https://stackoverflow.com/questions/48345315/error-deploying-with-firebase-on-npm-prefix-resource-dir-run-lint
// "npm --prefix ./functions/ run lint"

// firebase deploy
// after npm build in client copy build files to functions/build 


const express = require("express");
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
    res.set('Cache-control', 'public, max-age=300, s-maxage=600');
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


// app.get('/data', (req, res) => {
//     res.set('Cache-control', 'public, max-age=300, s-maxage=600')
//     res.json('data')
// });


exports.app = functions.https.onRequest(app);