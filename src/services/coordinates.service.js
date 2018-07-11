var nodeGeocoder = require("node-geocoder");

var optionsGeocode = {
  provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: process.env.GOOGLE_API, // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

var geocoder = nodeGeocoder(optionsGeocode);

exports.coordinates = location => {

    return geocoder.geocode(location, (err, res) => {
        res.latLon = {
            latitude: res[0].latitude,
            longitude: res[0].longitude
        };
        var latLon = res.latLon;

        return res.latLon;
    });
}
