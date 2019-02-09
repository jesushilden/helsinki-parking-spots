const Sequelize = require("sequelize");
const path = require("path");

const sequelize = new Sequelize(null, null, null, {
  dialect: "sqlite",
  storage: path.resolve(__dirname, "db/parking.db")
});

const Area = sequelize.define("parkingareas", {
  areaId: Sequelize.STRING,
  capacity: Sequelize.INTEGER,
  currentParkingCount: Sequelize.INTEGER
});

const Coordinate = sequelize.define("coordinates", {
  areaId: Sequelize.STRING,
  lat: Sequelize.FLOAT,
  long: Sequelize.FLOAT
});

Area.sync();
Coordinate.sync();

module.exports = {
  Area,
  Coordinate
};
