"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Order, {
        foreignKey: "id_user",
      });

      User.hasMany(models.Product, {
        foreignKey: "id_user",
      });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Name is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Email is not valid",
          },
          isLowercase: {
            msg: "Email is not lowercase",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Password is required",
          },
          len: {
            args: [6, 100],
            msg: "Password must be at least 6 characters",
          },
        },
      },
      picture: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            msg: "Picture is required",
          },
          isUrl: {
            msg: "Picture is not valid",
          },
        },
      },
      phone_number: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Phone number is required",
          },
          isNumeric: {
            msg: "Phone number is not valid",
          },
        },
      },
      address: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            msg: "Address is required",
          },
        },
      },
      city: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "City is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
