const Sequelize = require("sequelize");
const { Area, Coordinate } = require("./models");
const Op = Sequelize.Op;

const targetLat = 24.9509534809651;
const targetLong = 60.1715206476324;
const distance = 0.001;

const getCoordinates = async () => {
  const areaIds = await Coordinate.findAll({
    attributes: ["areaId"],
    group: "areaId",
    where: {
      lat: {
        [Op.between]: [targetLat - distance, targetLat + distance]
      },
      long: {
        [Op.between]: [targetLong - distance, targetLong + distance]
      }
    },
    raw: true
  });
  const response = await Promise.all(
    areaIds.map(async item => {
      const { areaId } = item;
      const coordinates = await Coordinate.findAll({
        attributes: ["lat", "long"],
        where: {
          areaId
        },
        raw: true
      });
      return {
        areaId,
        coordinates,
        capacityEstimate: null,
        currentParkingCount: null
      };
    })
  );
  return response;
};

module.exports = { getCoordinates };
