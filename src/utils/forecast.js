//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require('request')


const forecast = (lat,lon,callback)=>{
const url =
  `http://api.weatherstack.com/current?access_key=fdf8ab1b8c2ead15eeb958c3e773b531&query=${lat},${lon}`;

request({ url: url, json: true }, (error, response) =>{
if (error) {
    callback('Unable to connect to weather service!',undefined)
} else if (response.body.error) {
          callback('Unable to find location',undefined)
      }
 else {
    callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out.")
}
})
}  

module.exports = forecast

