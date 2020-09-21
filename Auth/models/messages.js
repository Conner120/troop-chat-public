/* jshint indent: 1 */
var uuid = require('uuid');

module.exports = function(sequelize, DataTypes) {
	var messages= sequelize.define('messages', {
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4,
			unique:true,				primaryKey: true,
			unique:true,

			field: 'id'
		},

		content: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'content'
		},
		// hasmedia: {
		// 	type: DataTypes.BOOLEAN,
		// 	allowNull: true,
		// 	defaultValue: false,
		// 	field: 'hasmedia'
		// },
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
		conversationId: {
			type: DataTypes.UUID,
			allowNull: true,
			references: {
				model: 'conversations',
				key: 'id'
			},
			field: 'conversation_id'
		},senderId: {
			type: DataTypes.UUID,
			allowNull: true,
			references: {
				model: 'profiles',
				key: 'id'
			},
			field: 'sender'
		}
	}, {
		tableName: 'messages'
	});
	messages.associate=function (models) {
		messages.belongsTo(models.conversations, { foreignKey: 'conversationId' });
		messages.belongsTo(models.profiles,{foreignKey:'sender'})
	}
	return messages
};
