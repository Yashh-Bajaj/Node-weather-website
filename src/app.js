const { response } = require("express");
const express = require("express");
const { request } = require("http");
const path = require("path");
const hbs = require("hbs");
const { hasSubscribers } = require("diagnostics_channel");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (request, response) => {
  response.render("index", {
    title: "Weather",
    name: "Yash Bajaj",
  });
});

app.get("/about", (request, response) => {
  response.render("about", {
    title: "About me",
    name: "Yash Bajaj",
  });
});
app.get("/help", (request, response) => {
  response.render("help", {
    helpmessage: "This is a help message for everyone",
    title: "Help",
    name: "Yash Bajaj",
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
      return res.send({
          error: 'You must provide an address!'
      })
  }

  geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
      if (error) {
          return res.send({ error })
      }

      forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
              return res.send({ error })
          }

          res.send({
              forecast: forecastData,
              location,
              address: req.query.address
          })
      })
  })
})

app.get("/products", (request, response) => {
  if (!request.query.search) {
    response.send({
      error: "You must provide a search term",
    });
  }
  console.log(request.query.search);
  response.send({
    product: [],
  });
});

app.get("/help/*", (request, response) => {
  response.render("404", {
    name: "Yash Bajaj",
    title: "Error",
    errorpage: "Help article not found",
  });
});
app.get("*", (request, response) => {
  response.render("404", {
    name: "Yash Bajaj",
    title: "Error",
    errorpage: "Page Not Found",
  });
});
app.listen(3000, () => {
  console.log("Server is listening up on port 3000");
});
