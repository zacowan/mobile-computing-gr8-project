var express = require("express");
var router = express.Router();

var appRouter  = require("./apps");
var discoveryRouter = require("./discovery");
var workingDirRouter = require("./workingDir");
var serviceCallerRouter = require("./serviceCaller");

router.use("/apps", appRouter);
router.use("/discover", discoveryRouter);
router.use("/workingdir", workingDirRouter);
router.use("/serviceCaller", serviceCallerRouter);

module.exports = router;