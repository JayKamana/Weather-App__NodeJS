const request = require('request');

let getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.forecast.io/forecast/9fecbd590bc5d9a95878588534b3d565/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if(!error && response.statusCode === 200){
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      })
    } else {
      console.log('Unable to fetch weather')
    }
     
  })
}

module.exports = {
  getWeather
}