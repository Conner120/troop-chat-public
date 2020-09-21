/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('media', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			unique:true,
			allowNull: false,
			primaryKey: true,
			field: 'id'
		},

		name: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'name'
		},
		uri: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'uri'
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
		},
		messageId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: 'messages',
				key: 'id'
			},
			field: 'message_id'
		}
	}, {
		tableName: 'media'
	});
};
