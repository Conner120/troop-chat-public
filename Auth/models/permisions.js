/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
    let permissions = sequelize.define('permissions', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            primaryKey: true,
            field: 'id'
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: '0',
            field: 'role_type'
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'title'
        },
        adminLevel: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: '0',
            field: 'admin_level'
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
        profileId: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'profiles',
                key: 'id'
            },
            field: 'profile_id'
        },
        settings: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'settings'
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'updatedAt'
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'createdAt'
        },
        canChat:{
            type: DataTypes.BOOLEAN,
            allowNull:true,
            field: 'CanChat'
        },
        canPost:{
            type: DataTypes.BOOLEAN,
            allowNull:true,
            field: 'CanPost'
        },
        canManageMembership:{
            type: DataTypes.BOOLEAN,
            allowNull:true,
            field: 'CanManageMembership'
        },
        canAdminOrganization:{
            type: DataTypes.BOOLEAN,
            allowNull:true,
            field: 'canAdminOrganization'
        },twodeep:{
            type: DataTypes.BOOLEAN,
            allowNull:true,
            defaultValue:false,
            field: 'twodeep'
        }
    }, {
        tableName: 'permissions'
    });
    permissions.associate = function(models) {
        permissions.belongsTo(models.orgs,{foreignKeyConstraint: true,as: "org",foreignKey:'orgId'})
    }
    return permissions;
};