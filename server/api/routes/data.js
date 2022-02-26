const data_router = require("express").Router();

const { a, b, signup, redirectBack } = require("../controller/data");


data_router.get("/api", a);

data_router.get("/data", b);

data_router.post("/signup", signup);

// uncaught exception
data_router.get("/*", redirectBack);


module.exports = data_router;
