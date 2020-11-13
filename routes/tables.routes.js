var express = require('express');
var router = express.Router();

const {
    newTable,
    list
} = require("../controllers/tables.controller");

/* GET home page. */
router.post('/new', newTable);

router.get('/list', list);

module.exports = router;
