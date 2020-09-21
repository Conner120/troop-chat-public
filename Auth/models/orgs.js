/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
    let orgs = sequelize.define('orgs', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            primaryKey: true,
            field: 'id'
        },

        orgname: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'orgname'
        },
        location: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'location'
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'description'
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
            type: DataTypes.DATE,
            allowNull: true,
            field: 'updatedAt'
        }
    }, {
        tableName: 'orgs'
    });
    orgs.associate = function(models) {
        orgs.hasMany(models.permissions, { foreignKey: 'orgId' })
        orgs.belongsToMany(models.profiles, { as: 'members', through: 'profiles_orgs', otherKey: 'profile_id', foreignKey: 'org_id' })
        orgs.hasMany(models.conversations, { foreignKey: 'orgId' })
        orgs.hasMany(models.meetings, { foreignKey: 'orgsId' })
    }
    return orgs;
};