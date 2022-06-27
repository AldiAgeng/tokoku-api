const { Product, CategoryProduct, User } = require("../models");

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
          attributes: ["id", "name", "email", "picture", "phone_number", "address"],
        },
      ],
      where: {
        id_user: user,
      },
      attributes: ["id", "name", "picture", "price", "location", "description", "status"],
    });
  },
  // seller/product/:id / get product by id
  find(id) {
    return Product.findOne({
      include: [
        {
          model: CategoryProduct,
          attributes: ["name"],
        },
        {
          model: User,
          attributes: ["name", "email", "picture", "phone_number", "address"],
        },
      ],
      where: {
        id,
      },
      attributes: ["id", "name", "picture", "price", "location", "description", "status"],
    });
  },
  // seller/product / create product
  create(data, id_user) {
    return Product.create({
      ...data,
      id_user,
    });
  },
  // seller/product/:id / update product
  update(id, data) {
    return Product.update(data, {
      where: {
        id,
      },
    });
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

  // findByCategory(category) {
  //   return Product.findAll({
  //     include: [
  //       {
  //         model: CategoryProduct,
  //         where: { name: category },
  //       },
  //     ],
  //   });
  // },
};
