const util = require("util");
const request = util.promisify(require("request"));
const _ = require("lodash");
const axios = require('axios');

const { Areas, Polygons } = require('./models');

const PARKING_AREA_URL = "https://pubapi.parkkiopas.fi/public/v1/parking_area/";

async function setUpParkingData() {
  let url = PARKING_AREA_URL;
		
  while (url != null) {
		const response = await axios.get(url);
		const data = response.data;
		const { next, features } = data;
		console.log({ next });
		console.log({ features });
		features.forEach(feature => {
			const areaId = feature.id;
			const { coordinates } = feature.geometry;
			const flatCoordinates = _.flattenDepth(coordinates, 2);
			const parsedCoordinates = flatCoordinates.map(coordinatePair => {
				const [lat, long] = coordinatePair;
				return {
					areaId,
					lat,
					long,
				};
			});
			Polygons.bulkCreate(parsedCoordinates);
		});
		url = next;
  }
}

setUpParkingData();
