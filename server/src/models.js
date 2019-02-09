const Sequelize = require('sequelize');

const sequelize = new Sequelize(null, null, null, {
	dialect: 'sqlite',
	storage: './db/parking.db',
});

const Areas = sequelize.define('parkingareas', {
	id: {
		type: Sequelize.STRING,
		primaryKey: true,
	},
	capacity: Sequelize.INTEGER,
});

const Polygons = sequelize.define('polygons', {
	id: {
		type: Sequelize.STRING,
		primaryKey: true,
	},
	lat: Sequelize.FLOAT,
	long: Sequelize.FLOAT,
});

Areas.sync();
Polygons.sync();

module.exports = {
	Areas,
	Polygons,
};
