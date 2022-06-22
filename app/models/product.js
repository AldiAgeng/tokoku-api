"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.CategoryProduct, {
        foreignKey: "id_category_product",
      });

      Product.hasMany(models.Order, {
        foreignKey: "id_product",
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      picture: DataTypes.TEXT,
      price: {
        type: DataTypes.INTEGER,
        isNumeric: true,
      },
      location: DataTypes.TEXT,
      description: DataTypes.TEXT,
      status: DataTypes.STRING,
      id_category_product: DataTypes.INTEGER,
      id_user: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
