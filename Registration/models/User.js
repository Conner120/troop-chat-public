'use strict';
var bcrypt = require('bcrypt-nodejs');
var uuid = require('uuid');
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        id: {
            type: DataTypes.UUID,
            allowNull: true,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            primaryKey: true,
            field: 'id'
        },
        username: DataTypes.STRING(90),
        password: DataTypes.STRING(180),
    }, { freezeTableName: true, });
    User.beforeSave((user, options) => {
        if (user.changed('password')) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
        }
    });
    User.prototype.comparePassword = function(passw, cb) {
        bcrypt.compare(passw, this.password, function(err, isMatch) {
            if (err) {
                return cb(err);
            }
            cb(null, isMatch);
        });
    };
    User.associate = function(models) {
        User.hasOne(models.profiles, { foreignKey: 'usersId' })
    };
    return User;
};