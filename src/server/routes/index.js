var express = require('express');
var services = require("../services/services.js");
var router = express.Router();


/* GET home page. */
router.get('/', (req, res, next) => {
    res.send('Home');
});

router.post('/calculate', (req, res, next) => {

    console.log("Body: " + req.body.data);
    var data = req.body.data;
    services.calculateRoutes(data, req);

});

router.get('/search', (req, res, next) => {
    return services.searchPlace(req.subStr);
});


module.exports = router;