const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .option({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

  let encodedAddress = encodeURIComponent(argv.address);

  let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyCNbUPZH4soGiVI_5TV7mF_Irnl9s6oxLc`;

  axios.get(geocodeUrl).then((response) => {
    if(response.data.status === 'ZERO_RESULTS'){
      throw new Error('Unable to find address')
    }
    let lat = response.data.results[0].geometry.location.lat;
    let lng = response.data.results[0].geometry.location.lng;
    let weatherUrl = `https://api.forecast.io/forecast/9fecbd590bc5d9a95878588534b3d565/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
  }).then((response) => {
    let temperature = response.data.currently.temperature;
    let apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}, it feels like ${apparentTemperature}.`);
  }).catch((e) => {
    if(e.code === 'ENOTFOUND'){
      console.log('Unable to connect to API Servers')
    } else {
      console.log(e.message);
    }
  });
  