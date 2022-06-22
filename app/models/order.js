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
        isNumeric: true,
      },
      status: DataTypes.STRING,
      id_product: DataTypes.INTEGER,
      id_user: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
