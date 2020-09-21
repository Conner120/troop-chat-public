/* jshint indent: 1 */
const conversations = require('./conversations');
var uuid = require('uuid');

module.exports = function (sequelize, DataTypes) {
    profiles = sequelize.define('profiles', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            primaryKey: true,
            field: 'id'
        },
        settings: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'settings'
        },
        usersId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            },
            field: 'users_id'
        },
        first: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'first'
        },
        last: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'last'
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'email'
        },
        phone: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'phone'
        },

        DOB: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'dob'
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
        profilepicuri: {
            type: DataTypes.STRING(2048),
            allowNull: true,
            field: 'profilepicuri'
        }
    }, {
        tableName: 'profiles'
    });
    profiles.associate = function (models) {
        profiles.belongsToMany(models.conversations, { foreignKeyConstraint: true, through: 'profiles_conversations', foreignKey: 'profile_id', otherKey: 'conversation_id' })
        profiles.belongsToMany(models.orgs, { foreignKeyConstraint: true, as: 'organizations', through: 'permissions', foreignKey: 'profile_id', otherKey: 'org_id' })
        profiles.belongsToMany(models.profiles, { foreignKeyConstraint: true, as: 'parents', through: 'guardian', foreignKey: 'child', otherKey: 'guardian' })
        profiles.belongsToMany(models.profiles, { foreignKeyConstraint: true, as: 'kids', through: 'children', foreignKey: 'parent', otherKey: 'child' })
        profiles.belongsTo(models.users, { foreignKeyConstraint: true, as: "user", foreignKey: 'users_id' })
        // profiles.hasMany(models.permissions,{foreignKeyConstraint: true, through: 'permissions', foreignKey: 'profile_id',otherKey: 'id'})
        profiles.hasMany(models.profilesOrgsMeetings, { foreignKeyConstraint: true, foreignKey: 'profiles' })
    }
    return profiles;
};
