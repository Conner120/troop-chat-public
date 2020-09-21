/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('profilesOrgs', {
        profileId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'profiles',
                key: 'id'
            },
            field: 'profile_id'
        },
        orgId: {
            type: DataTypes.UUID,
            allowNull: false,
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
        },
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            primaryKey: true,
            field: 'id'
        }
    }, {
        tableName: 'profiles_orgs'
    });
};