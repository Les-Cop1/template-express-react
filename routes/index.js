const express = require('express');
const router = express.Router();
const {usersInfo} = require("../database/index");


/* GET home page. */
router.get('/', function(req, res, next) {
  let response = {
    success: true
  }

  res.send(response)
});

module.exports = router;
