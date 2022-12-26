"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Feed extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Feed.belongsTo(models.User, {foreignKey: "userId"});
        }
    }
    Feed.init(
        {
            postId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            subject: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            content: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            likes: {
                allowNull: false,
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            userId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize,
            modelName: "Feed",
        }
    );
    return Feed;
};
