var express = require('express');
var services = require("../services/services.js");
var router = express.Router();


/* GET home page. */
router.get('/', (req, res, next) => {
    res.send('Home');
});

router.post('/calculate', (req, res, next) => {

    var data = req.body.data;
    services.calculateRoutes(data).then((resultArray) => {
        res.send(resultArray);
    }).catch((error) => {
        res.status(500).json(error);
    });

});

router.post('/search', (req, res, next) => {
    services.searchPlace(req.body.city).then((predictions) => {
        res.send(predictions)
    }).catch((error) => {
        res.status(500).json(error);
    });
});

module.exports = router;