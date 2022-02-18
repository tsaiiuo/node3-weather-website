const express = require("express");
const path = require("path");
const hbs = require("hbs");
//const request = require("postman-request");
const geocode = require("./units/geocode.js");
const forecast = require("./units/forecast");
const app = express();
const htmlPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
//Setup static directory to save
app.use(express.static(htmlPath));
//Setup handlerbars engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);

hbs.registerPartials(partialsPath);

//Express.js
app.get("", (req, res) => {
  res.render("index", {
    name: "Ian",
    title: "Weather App",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    name: "Ian",
    title: "About",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    name: "Ian",
    title: "Help",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide address!",
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, city } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(latitude, longitude, (error, data) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        forecast: data,
        location: city,
        address: req.query.address,
      });
    });
  });
});
//404
app.get("/about/*", (req, res) => {
  res.render("404", {
    name: "Ian",
    title: "404",
    errorMessage: "About article not found",
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    name: "Ian",
    title: "404",
    errorMessage: "Help article not found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    name: "Ian",
    title: "404",
    errorMessage: "Page not found",
  });
});

//Listener
app.listen("3000", () => {
  console.log("server up!");
});
