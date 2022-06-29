const { Order, Product, User } = require("../models");

module.exports = {
  findBidProduct(user) {
    return Order.findAll({
      include: [
        {
          // product bid
          model: Product,
          atributes: ["id", "name", "picture", "price", "status", "description"],
          // where this product have a user
          where: {
            id_user: user,
          },
        },
        {
          // user bid product
          model: User,
          attributes: ["id", "name", "picture", "phone_number"],
        },
      ],
    });
  },
  findById(id) {
    return Order.findByPk(id, {
      include: [
        {
          model: Product,
          attributes: ["id", "name", "picture", "price", "status", "description"],
        },
        {
          model: User,
          attributes: ["id", "name", "picture", "phone_number"],
        },
      ],
    });
  },
  updateStatus(id, data) {
    return Order.update(
      {
        status: data,
      },
      {
        where: { id },
      }
    );
  },
};
