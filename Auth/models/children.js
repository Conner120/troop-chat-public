/* jshint indent: 1 */
var uuid = require('uuid');

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('children', {
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4,
			unique:true,
			primaryKey: true,
			field: 'id'

		},
		parent: {
			type: DataTypes.UUID,
			allowNull: true,
			field: 'parent'
		},
		child: {
			type: DataTypes.UUID,
			allowNull: true,
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
		tableName: 'children'
	});
};
