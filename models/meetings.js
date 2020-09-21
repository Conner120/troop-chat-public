/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	let meetings = sequelize.define('meetings', {
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4,
			unique:true,			primaryKey: true,
			field: 'id'
		},

		starttime: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'starttime'
		},
		meetinglength: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'meetinglength'
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'description'
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
		orgsId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: 'orgs',
				key: 'id'
			},
			field: 'orgs_id'
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
		tableName: 'meetings'
	});
	meetings.associate = function(models) {
		meetings.hasMany(models.profilesOrgsMeetings,{foreignKey:'meetingId'})
	}
	return meetings;
};
