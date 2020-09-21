/* jshint indent: 1 */
var uuid = require('uuid');

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('guardian', {
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4,
			unique:true,
			primaryKey: true,
			unique:true,

			field: 'id'
		},
		guardian: {
			type: DataTypes.UUID,
			allowNull: true,
			references: {
				model: 'profiles',
				key: 'id'
			},
			field: 'guardian'
		},
		child: {
			type: DataTypes.UUID,
			allowNull: true,
			references: {
				model: 'profiles',
				key: 'id'
			},
			field: 'child'
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'createdAt'
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'updatedAt'
		}
	}, {
		tableName: 'guardian'
	});
};
