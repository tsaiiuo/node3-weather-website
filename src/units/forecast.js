const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=52bc591aa966e6fd4bc5a2208f2bc84f&query=" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect weather api!", undefined);
    } else if (body.error) {
      callback("Unable to find the location weather!", undefined);
    } else {
      const data = body.current;
      callback(
        undefined,
        "The weather is " +
          data.weather_descriptions +
          " The temperature right now is " +
          data.temperature +
          " and feels like " +
          data.feelslike +
          "<br>" +
          "Humidity: " +
          data.humidity +
          " persent" +
          "<br>" +
          "Region: " +
          body.location.region +
          "<br>" +
          " Local time: " +
          body.location.localtime
      );
    }
  });
};

module.exports = forecast;
