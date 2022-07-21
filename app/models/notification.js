"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Notification.belongsTo(models.Order, {
        foreignKey: "id_order",
      });
    }
  }
  Notification.init(
    {
      id_order: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
          isNumeric: true,
        },
      },
      is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate: {
          notEmpty: true,
          isIn: [[true, false]],
        },
      },
    },
    {
      sequelize,
      modelName: "Notification",
    }
  );
  return Notification;
};
