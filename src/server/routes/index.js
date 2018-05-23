var express = require('express');
var services = require("../services/services.js");
var router = express.Router();


/* GET home page. */
router.get('/', (req, res, next) => {
    res.send('Home');
});

router.get('/calculate', (req, res, next) => {

    var data = {
        routes: [{
            address: "Ankara, Türkiye",
            lat: "39.920777",
            lng: "32.854058"
        },
            {
                address: "İzmir, Türkiye",
                lat: "38.428702",
                lng: "27.134476",
            },
            {
                address: "Konya, Türkiye",
                lat: "37.871357",
                lng: "32.50058"
            }],
        params: {
            tollRoad: true,
            boatFery: true,
            tunnel: true,
            dirtRoad: true
        }
    };
    services.calculateRoutes(data);
});

router.get('/search',(req,res,next) => {
    return services.searchPlace(req.subStr);
});


module.exports = router;