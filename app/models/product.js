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

      Product.belongsTo(models.User, {
        foreignKey: "id_user",
      });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Name is required",
          },
        },
      },
      picture: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            msg: "Picture is required",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Price is required",
          },
          isNumeric: {
            msg: "Price is not valid",
          },
        },
      },
      location: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            msg: "Location is required",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            msg: "Description is required",
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
            args: [["available", "sold"]],
            msg: "Status is not valid",
          },
        },
      },
      id_category_product: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "Category is required",
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
      modelName: "Product",
    }
  );
  return Product;
};
