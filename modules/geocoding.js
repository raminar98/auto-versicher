const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

require("dotenv").config();
const mapToken = process.env.MAP_API_KEY;

const mapBoxApiUrl = (ort, bundesland) =>
  `https://maps.googleapis.com/maps/api/geocode/json?address=${ort}+${bundesland}&key=${mapToken}`;

function httpGet(theUrl) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false);
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

const geoData = (url) => {
  try {
    const geo_maps_req = JSON.parse(httpGet(url)).results[0].geometry.location;
    const lat = geo_maps_req.lat;
    const lng = geo_maps_req.lng;
    return { coordinates: [lng, lat] };
  } catch (e) {
    return { coordinates: [] };
  }
};

const geoShortCode = (url) => {
  const api_req_data = JSON.parse(httpGet(url)).results[0].address_components;
  try {
    if (api_req_data !== undefined) {
      return api_req_data[api_req_data.length - 2].short_name;
    } else {
      if (
        JSON.parse(httpGet(url)).features[0].properties.short_code === undefined
      ) {
        return JSON.parse(httpGet(url)).features[0].context[0].short_code;
      } else {
        return JSON.parse(httpGet(url)).features[0].properties.short_code;
      }
    }
  } catch (e) {
    return [];
  }
};

module.exports = { mapBoxApiUrl, geoData, geoShortCode };
