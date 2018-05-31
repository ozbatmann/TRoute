var express = require('express');
var services = require("../services/services.js");
var router = express.Router();


/* GET home page. */
router.get('/', (req, res, next) => {
    res.send('Home');
});

router.post('/calculate', (req, res, next) => {

    let data = req.body.data;
    services.calculateRoutes(data).then((resultArray) => {
        res.send(resultArray);
    }).catch((e) => {
       res.send(e);
    });

});

router.post('/search', (req, res, next) => {
    services.searchPlace(req.body.city).then((predictions) => {
        res.send(predictions)
    }).catch((e) => {
        res.send(e);
    });
});

module.exports = router;