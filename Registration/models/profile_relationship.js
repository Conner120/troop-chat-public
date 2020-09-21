/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('profileRelationship', {
        profile1: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'profile1'
        },
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            primaryKey: true,
            field: 'id'
        },
        profile2: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'profile2'
        },
        relationshipType: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'relationship_type'
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
        tableName: 'profile_relationship'
    });
};