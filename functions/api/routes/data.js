const data_router = require("express").Router();
const { handler } = require("firebase-functions/v1");
const { a, b, c } = require("../controller/data");

data_router.get("/api", a);

data_router.get("/data", b);

data_router.get("/*", handler={}, c);

module.exports = data_router;
