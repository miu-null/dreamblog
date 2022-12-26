"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here 일대일 일대다 다대일 다대다 관계
            models.User.hasMany(models.Feed, {foreignKey: "userId"});
        }
    }
    User.init(
        {
            userId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },

            userName: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            passWord: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
