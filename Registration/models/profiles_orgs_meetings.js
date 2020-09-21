/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('profilesOrgsMeetings', {
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4,
			unique:true,				primaryKey: true,
			field: 'id'
		},

		profiles: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: 'profiles',
				key: 'id'
			},
			field: 'profiles'
		},
		meetingId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: 'meetings',
				key: 'id'
			},
			field: 'meeting_id'
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
		state: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'state'
		},
		notes: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'notes'
		}
	}, {
		tableName: 'profiles_orgs_meetings'
	});
};
