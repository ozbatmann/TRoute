var express = require('express');
var services = require("../services/services.js");
var router = express.Router();


/* GET home page. */
router.get('/', (req, res, next) => {
    res.send('Home');
});

router.post('/calculate', (req, res, next) => {

    let data = req.body.data;
    //services.calculateRoutes(data, req);

});

router.post('/search', (req, res, next) => {
    return services.searchPlace(req.body.city);
});


module.exports = router;