/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('event', {
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			field: 'id',

			defaultValue: DataTypes.UUIDV4,
			unique:true,
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'name'
		},
		eventstart: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'eventstart'
		},
		duration: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'duration'
		},
		description: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'description'
		},
		eventtype: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'eventtype'
		},
		settings: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'settings'
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'createdAt'
		},
		updatedAt: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'updatedAt'
		}
	}, {
		tableName: 'event'
	});
};
