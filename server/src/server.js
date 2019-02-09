//@ts-check
const express = require("express");
const { getCoordinates } = require("./databaserequests");

const app = express();
const port = 3001;

app.get("/api/v1/parking-areas", async (req, res) => {
  try {
    const {
      latCoordinate: latCoordinateStr,
      longCoordinate: longCoordinateStr,
      distance: distanceStr
    } = req.query;
    const latCoordinate = latCoordinateStr && +latCoordinateStr;
    const longCoordinate = longCoordinateStr && +longCoordinateStr;
    const distance = distanceStr && +distanceStr;
    const data = await getCoordinates(latCoordinate, longCoordinate, distance);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Unexpected error" });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
