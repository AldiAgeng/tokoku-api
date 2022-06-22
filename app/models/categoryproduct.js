"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CategoryProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CategoryProduct.hasMany(models.Product, {
        foreignKey: "id_category_product",
      });
    }
  }
  CategoryProduct.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CategoryProduct",
    }
  );
  return CategoryProduct;
};
