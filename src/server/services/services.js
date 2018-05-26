const axios = require('axios');
const Truck = require('../models/truck');
var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBuVr4P3TdZYRerMVlLhQjytKEZNgIV0Zw',
    Promise: Promise
});

var searchPlace = (subStr) => {
    googleMapsClient.placesAutoComplete({input: subStr, types: 'address', language: 'tr'}).asPromise()
        .then((response) => {
            return response.json.predictions;
        })
        .catch((err) => {
            return err;
        });
};

var calculateRoutes = (data, req) => {
    var tollRoad = data.params.tollRoad;
    var boatFerry = data.params.boatFery;
    var tunnel = data.params.tunnel;
    var dirtRoad = data.params.dirtRoad;

    for (var i = 0; i < data.routes.length - 1; i++) {

        var truckRestrictionPenalty = "strict";

        var url = "https://route.cit.api.here.com/routing/7.2/calculateroute.json?app_id=VOxyVH1xVASAQFZnuq6F&app_code=Qp6kUzEAaJNY6qlLl1zC8Q";

        url += "&waypoint0=geo!" + data.routes[i].lat + "," + data.routes[i].lng;
        url += "&waypoint1=geo!" + data.routes[i + 1].lat + "," + data.routes[i + 1].lng;

        url += "&mode=fastest;truck;traffic:disabled;";

        if (!boatFerry) {
            url += "boatFerry:-3;";
        }
        if (!tollRoad) {
            url += "tollroad:-3";
        }
        if (!tunnel) {
            url += "tunnel:-3;";
        }
        if (!dirtRoad) {
            url += "dirtRoad:-3;";
        }


        var truck = new Truck(1, 4.25, 13.6, 2.45, 12, 12, 2);

        url += "&trailersCount=" + truck.trailersCount;
        url += "&limitedWeight=" + truck.limitedWeight;
        url += "&weightPerAxle=" + truck.weightPerAxle;
        url += "&height=" + truck.height;
        url += "&width=" + truck.width;
        url += "&length=" + truck.length;
        url += "&truckRestrictionPenalty=" + truckRestrictionPenalty;
        url += "&language=tr-tr";
        axios.get(url)
            .then(response => {
                console.log(response.data.response.route);
            })
            .catch(error => {
                console.log(error);
            });
        console.log(url);
    }

};

module.exports.calculateRoutes = calculateRoutes;
module.exports.searchPlace = searchPlace;