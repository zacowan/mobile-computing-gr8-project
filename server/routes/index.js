var express = require("express");
var router = express.Router();

var appRouter  = require("./apps");
var discoveryRouter = require("./discovery");

router.use("/apps", appRouter);
router.use("/discover", discoveryRouter);

module.exports = router;