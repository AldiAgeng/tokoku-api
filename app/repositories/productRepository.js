const { Product, CategoryProduct, User } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  // Seller
  // seller/product / get all product by user seller
  findProductByUser(user) {
    return Product.findAll({
      include: [
        {
          model: CategoryProduct,
          attributes: ["id", "name"],
        },
        {
          model: User,
          attributes: ["id", "name", "email", "picture", "phone_number", "address", "city"],
        },
      ],
      where: {
        id_user: user,
      },
      attributes: ["id", "name", "picture", "price", "location", "description", "status"],
      order: [["createdAt", "DESC"]],
    });
  },
  // seller/product/:id / get product by id
  find(id) {
    return Product.findOne({
      include: [
        {
          model: CategoryProduct,
          attributes: ["id", "name"],
        },
        {
          model: User,
          attributes: ["id", "name", "email", "picture", "phone_number", "address", "city"],
        },
      ],
      where: {
        id,
      },
      attributes: ["id", "name", "picture", "price", "location", "description", "status"],
    });
  },
  // seller/product / create product
  create(data, id_user, url) {
    return Product.create({
      name: data.name,
      picture: url,
      price: data.price,
      location: data.location,
      description: data.description,
      status: data.status,
      id_category_product: data.id_category_product,
      id_user,
    });
  },
  // seller/product/:id / update product
  update(id, data, url) {
    return Product.update(
      {
        name: data.name,
        picture: url,
        price: data.price,
        location: data.location,
        description: data.description,
        status: data.status,
        id_category_product: data.id_category_product,
      },
      {
        where: {
          id,
        },
      }
    );
  },
  // seller/product/:id / delete product
  delete(id) {
    return Product.destroy({
      where: {
        id,
      },
    });
  },
  // count product ready by seller for handling max 4 product ready
  countByStatusAndUser(user) {
    return Product.count({
      where: {
        status: "available",
        id_user: user,
      },
    });
  },
  // End Seller

  // Buyer
  // buyer/product/ get all product available
  findAllAvailable() {
    return Product.findAll({
      include: [
        {
          model: CategoryProduct,
          attributes: ["id", "name"],
        },
        {
          model: User,
          attributes: ["id", "name", "email", "picture", "phone_number", "address", "city"],
        },
      ],
      where: {
        status: "available",
      },
      attributes: ["id", "name", "picture", "price", "location", "description", "status"],
      order: [["createdAt", "DESC"]],
    });
  },

  filterByCategory(category) {
    return Product.findAll({
      include: [
        {
          model: CategoryProduct,
          attributes: ["id", "name"],
          where: {
            name: {
              [Op.iLike]: `%${category}%`,
            },
          },
        },
        {
          model: User,
          attributes: ["id", "name", "email", "picture", "phone_number", "address", "city"],
        },
      ],
      where: {
        status: "available",
      },
      attributes: ["id", "name", "picture", "price", "location", "description", "status"],
      order: [["createdAt", "DESC"]],
    });
  },
  filterByProduct(product) {
    return Product.findAll({
      include: [
        {
          model: CategoryProduct,
          attributes: ["id", "name"],
        },
        {
          model: User,
          attributes: ["id", "name", "email", "picture", "phone_number", "address", "city"],
        },
      ],

      where: {
        [Op.and]: [
          {
            status: "available",
          },
          {
            name: {
              [Op.iLike]: `%${product}%`,
            },
          },
        ],
      },
      attributes: ["id", "name", "picture", "price", "location", "description", "status"],
      order: [["createdAt", "DESC"]],
    });
  },
};
