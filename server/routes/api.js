var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/discover', function(req, res, next) {
  res.send({"test": "test"})
});

module.exports = router;
