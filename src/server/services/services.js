const axios = require('axios');
const Truck = require('../models/truck');
var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyB6hXMYPb15UlHbjck1pfyME3jljqxtxjk',
    project: "troute",
    Promise: Promise
});

var searchPlace = async (subStr) => {
    var searchResult;
    try {
        searchResult = await googleMapsClient.placesAutoComplete({input: subStr, types: 'address', language: 'tr'}).asPromise();
        return searchResult;
    }catch (e) {
        throw new Error(e.json.error_message);
    }

};

var calculateRoutes = async (data) => {
    const resultArr = {};
    var routesArr = new Array();
    resultArr.opStatus = true;
    var tollRoad = data.params.tollRoad;
    var boatFerry = data.params.boatFery;
    var tunnel = data.params.tunnel;
    var dirtRoad = data.params.dirtRoad;

    nodes = [];

    for (var i = 0; i < data.routes.length;i++){
        try {
            var geoCodeResponse = await googleMapsClient.geocode({address: data.routes[i].description}).asPromise();
        } catch (e) {
           throw new Error(e.json.error_message);
        }
        var lat = geoCodeResponse.json.results[0].geometry.location.lat;
        var lng = geoCodeResponse.json.results[0].geometry.location.lng;

        var routeObj = {
            address:data.routes[i].description,
            lat:lat,
            lng:lng
        };

        nodes.push({routes:routeObj})

    }

    for (var i = 0; i < nodes.length - 1; i++) {



        var truckRestrictionPenalty = "strict";

        var url = "https://route.cit.api.here.com/routing/7.2/calculateroute.json?app_id=VOxyVH1xVASAQFZnuq6F&app_code=Qp6kUzEAaJNY6qlLl1zC8Q";

        url += "&waypoint0=geo!" + nodes[i].routes.lat + "," +  nodes[i].routes.lng ;
        url += "&waypoint1=geo!" +  nodes[i+1].routes.lat  + "," +  nodes[i+1].routes.lng ;

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
        console.log(url);

        try {
            var response = await axios.get(url);
            routesArr.push(response.data.response.route);
        } catch (e) {
            throw new Error(e.message);
        }
    }
    resultArr.result = routesArr;
    return resultArr;
};


module.exports.calculateRoutes = calculateRoutes;
module.exports.searchPlace = searchPlace;