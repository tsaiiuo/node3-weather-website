const request = require("postman-request");
const geocode = (address, callback) => {
  const gecodeURL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoidHNhaWl1b28iLCJhIjoiY2t6aTdtM2dxM2hieTJucHFhOGlmYXlmZSJ9.sx89qjtJX4SKFPwlsCrLlw&limit=1";
  request({ url: gecodeURL, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to use mapbox api!", undefined);
    } else if (!body.features[0]) {
      callback(
        "Unable to find the location latitude and longitude!",
        undefined
      );
    } else {
      const latitude = body.features[0].center[1];
      const longitude = body.features[0].center[0];
      callback(undefined, {
        latitude: latitude,
        longitude: longitude,
        city: address,
      });
    }
  });
};
module.exports = geocode;
