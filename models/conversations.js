/* jshint indent: 1 */
const messages = require('./messages');
module.exports = function(sequelize, DataTypes) {
	var conversations = sequelize.define('conversations', {
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4,
			unique:true,
			primaryKey: true,
			field: 'id'
		},
		title: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'title'
		},
		settings: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'settings'
		},
		orgId: {
			type: DataTypes.UUID,
			allowNull: true,
			references: {
				model: 'orgs',
				key: 'id'
			},
			field: 'org_id'
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
		tableName: 'conversations'
	});
	conversations.associate=function (models) {
		conversations.hasMany(models.messages);
		conversations.belongsToMany(models.profiles, { foreignKeyConstraint: true, through: 'profiles_conversations', otherKey: 'profile_id',foreignKey: 'conversation_id' })

	}
	return conversations;
};
