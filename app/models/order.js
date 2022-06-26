"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: "id_user",
      });

      Order.belongsTo(models.Product, {
        foreignKey: "id_product",
      });
    }
  }
  Order.init(
    {
      price: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: {
            msg: "Price is not valid",
          },
          notEmpty: {
            msg: "Price is required",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Status is required",
          },
          isIn: {
            args: [["bid", "accepted", "rejected"]],
            msg: "Status is not valid",
          },
        },
      },
      id_product: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Product is required",
          },
        },
      },
      id_user: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "User is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
