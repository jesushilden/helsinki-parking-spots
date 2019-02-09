const Sequelize = require('sequelize');

const sequelize = new Sequelize(null, null, null, {
	dialect: 'sqlite',
	storage: './db/parking.db',
});

const Areas = sequelize.define('parkingareas', {
	areaId: Sequelize.STRING,
	capacity: Sequelize.INTEGER,
});

const Polygons = sequelize.define('polygons', {
	areaId: Sequelize.STRING,
	lat: Sequelize.FLOAT,
	long: Sequelize.FLOAT,
});

Areas.sync();
Polygons.sync();

module.exports = {
	Areas,
	Polygons,
};
