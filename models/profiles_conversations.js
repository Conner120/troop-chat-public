/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('profilesConversations', {
        profileId: {
            type: DataTypes.UUIDV4,
            allowNull: true,
            references: {
                model: 'profiles',
                key: 'id'
            },
            field: 'profile_id'
        },
        conversationId: {
            type: DataTypes.UUIDV4,
            allowNull: true,
            references: {
                model: 'conversations',
                key: 'id'
            },
            field: 'conversation_id'
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
            type: DataTypes.UUIDV4,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            primaryKey: true,
            field: 'id'
        }
    }, {
        tableName: 'profiles_conversations'
    });
};