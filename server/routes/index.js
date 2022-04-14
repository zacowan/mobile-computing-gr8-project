var express = require("express");
var router = express.Router();

var appRouter  = require("./apps");
var discoveryRouter = require("./discovery");
var workingDirRouter = require("./workingDir");

router.use("/apps", appRouter);
router.use("/discover", discoveryRouter);
router.use("/workingdir", workingDirRouter);

module.exports = router;