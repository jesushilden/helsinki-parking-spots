const express = require("express");
const util = require("util");
const sequelize = require("sequelize");
const { Area, Coordinate } = require("./models");
const { getCoordinates } = require("./databaserequests");

const app = express();
const port = 3000;

const PARKING_AREA_URL = "https://pubapi.parkkiopas.fi/public/v1/parking_area/";

app.get("/api/v1/parking-areas", async (req, res) => {
  try {
    const data = await getCoordinates();
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Unexpected error" });
  }
});

async function getParkinAreas() {
  return [
    {
      id: "ef44a2eb-57ad-4889-bc38-c713fc2d59e2",
      capacityEstimate: 5,
      coordinates: [
        { latitude: 24.95095348096506, longitude: 60.171520647632406 },
        { latitude: 24.9509556803676, longitude: 60.17150419982532 },
        { latitude: 24.951907565280848, longitude: 60.171534655463105 },
        { latitude: 24.951905353253338, longitude: 60.17155181966475 },
        { latitude: 24.951552974429124, longitude: 60.17154054607087 },
        { latitude: 24.95095348096506, longitude: 60.171520647632406 }
      ]
    }
  ];
}

app.listen(port, () => console.log(`Listening on port ${port}!`));
