var rp = require('request-promise');

let trendingArea = null;
let woeid = null;
let optionsTopics = null;

exports.buildRequestForClosestAreaWithTrends = res => {
    const optionsWoeid = {
        url: 'https://api.twitter.com/1.1/trends/closest.json?lat=' + res.latLon.latitude + '&long=' + res.latLon.longitude,
        headers: {
            'Authorization': process.env.TWITTER_BEARER,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'mode': 'cors'}
    };
    return optionsWoeid;
}

exports.findClosestAreaWithTrends = optionsWoeid => {

    let closestTrending = null;

    return rp.get(optionsWoeid, (error, response, body) => {
        if (error) {
            console.log(error);
        } else {
            closestTrending = JSON.parse(response.body)[0];
            return closestTrending;
        }
    });

}

exports.buildTwitterTrendsUrl = closestTrending => {
    let topicsURL = '';
    woeid = JSON.parse(closestTrending)[0].woeid;
    topicsURL = 'https://api.twitter.com/1.1/trends/place.json?id=' + woeid;
    return topicsURL;
}

exports.getTrendingTopics = topicsURL => {
    optionsTopics = {
        url: topicsURL,
        headers: {
            'Authorization': process.env.TWITTER_BEARER,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'mode': 'cors'}
    };
    return rp.get(optionsTopics, (error, response, body) => {
        if (error) {
            console.log(error);
        } else {
            return response.body;
        }
    });
}
