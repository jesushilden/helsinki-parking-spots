const Sequelize = require("sequelize");
const { Area, Coordinate } = require("./models");
const Op = Sequelize.Op;

const getCoordinates = async (targetLat, targetLong, distance) => {
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
      const { capacity, currentParkingCount } = await Area.findOne({
        where: { areaId }
      });
      return {
        areaId,
        coordinates,
        capacityEstimate: capacity,
        currentParkingCount
      };
    })
  );
  return response;
};

module.exports = { getCoordinates };
