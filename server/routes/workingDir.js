var express = require("express");
var router = express.Router();
var { setData, getData } = require("../utils/redis");
const { getAtlasWorkingDir } = require("../utils/workingDir");
const fs = require("fs");

/**
 * GET (Returns the current Working Directory to the Front-End)
 */
router.get("/", async (req, res, next) => {
  // Get the WorkingDir in Redis
  var workingDir = await getAtlasWorkingDir();
  res.send({ workingDir: workingDir });
});

/**
 * PUT (Sets the current Working Directory from the Front-End)
 */
router.put("/", async (req, res, next) => {
  // Get the new Working Directory from the Request Body
  var { workingDir } = req.body;
  // Validate the working directory
  try {
    fs.accessSync(workingDir);
    // Set the WorkingDir in Redis
    await setData("workingDir", workingDir);
    res.send({ valid: true });
  } catch (error) {
    res.send({ valid: false });
  }
});

/**
 * DELETE (Gets rid of the working directory)
 */
router.delete("/", async (req, res, next) => {
  // Set the WorkingDir in Redis
  await setData("workingDir", undefined);
  res.send({ status: "reset" });
});

module.exports = router;
