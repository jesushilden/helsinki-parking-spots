const util = require("util");
const request = util.promisify(require("request"));
const _ = require("lodash");

const PARKING_AREA_URL = "https://pubapi.parkkiopas.fi/public/v1/parking_area/";

async function setUpParkingData() {
  let url = PARKING_AREA_URL;
  while (url != null) {
    const { statusCode, bodyString } = await request({ url });
    const data = JSON.parse(bodyString);
    const { next, features } = data;
    console.log("feat len", features.length);
    features.forEach(feature => {
      let { coordinates } = feature.geometry;
      coordinates = _.flattenDepth(coordinates, 2);
    });

    console.log(statusCode, body);
    return;
  }
}

setUpParkingData();
