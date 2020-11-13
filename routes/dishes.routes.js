var express = require('express');
var router = express.Router();

const {
    newDish,
    list
} = require("../controllers/dishes.controller");

/* GET home page. */
router.post('/new', newDish);

router.get('/list', list);

module.exports = router;
