var express = require('express');
var router = express.Router();
var request = require('request');
var rp = require('request-promise');

var Coordinates = require("../services/coordinates.service");
var TwitterTrends = require("../services/twitterTrends.service");

let twitterTopics = [];
var location = [];

router.get('/', function(req, res, next) {
    location = req.query.location;
    next();
}, function (req, res, next) {
    Coordinates.coordinates(location)
    .then(coordinfo => {
        const optionsWoeid = TwitterTrends.buildRequestForClosestAreaWithTrends(coordinfo);
        return TwitterTrends.findClosestAreaWithTrends(optionsWoeid);
    }).then(closestTrending => {
        const topicsURL = TwitterTrends.buildTwitterTrendsUrl(closestTrending);
        return TwitterTrends.getTrendingTopics(topicsURL);
    }).then(topics => {
        twitterTopics = JSON.parse(topics)[0].trends;
        next();
    }).catch(err => console.log(err));

}, function (req, res, next) {
    res.json(twitterTopics);
});

module.exports = router;
