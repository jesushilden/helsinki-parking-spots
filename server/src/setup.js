const util = require("util");
const request = util.promisify(require("request"));
const _ = require("lodash");
const axios = require("axios");

const { Area, Coordinate } = require("./models");

const PARKING_AREA_URL = "https://pubapi.parkkiopas.fi/public/v1/parking_area/";
const STATISTICS_URL =
  "https://pubapi.parkkiopas.fi/public/v1/parking_area_statistics/";

async function setUpParkingData() {
  let url = PARKING_AREA_URL;

  while (url != null) {
    const response = await axios.get(url);
    const data = response.data;
    const { next, features } = data;
    await Promise.all(
      features.map(async feature => {
        const areaId = feature.id;
        const capacity = feature.properties.capacity_estimate;
        const currentParking = null;
        await Area.create({
          areaId,
          capacity,
          currentParking
        });
        const { coordinates } = feature.geometry;
        const flatCoordinates = _.flattenDepth(coordinates, 2);
        const parsedCoordinates = flatCoordinates.map(coordinatePair => {
          const [lat, long] = coordinatePair;
          return {
            areaId,
            lat,
            long
          };
        });
        await Coordinate.bulkCreate(parsedCoordinates);
      })
    );
    url = next;
  }
  await updateCurrentCounts();
}

async function updateCurrentCounts() {
  let url = STATISTICS_URL;

  while (url != null) {
    const response = await axios.get(url);
    const data = response.data;
    const { next, results } = data;
    await Promise.all(
      results.map(async result => {
        const { id, current_parking_count } = result;
        try {
          const area = await Area.findOne({ where: { areaId: id } });
          if (area !== undefined && area.currentParking !== null) {
            await area.update({ currentParkingCount: current_parking_count });
          }
        } catch (err) {
          console.log(err);
        }
      })
    );
    url = next;
  }
}

setUpParkingData();

module.export = { updateCurrentCounts };
