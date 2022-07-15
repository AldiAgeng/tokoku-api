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
          attributes: ["id", "name", "email", "picture", "phone_number", "address", "city"],
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
          attributes: ["id", "name", "email", "picture", "phone_number", "address", "city"],
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

  // buyer
  createOrder(data, user) {
    return Order.create({
      ...data,
      id_user: user,
    });
  },
  findOrderByUser(user) {
    return Order.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "name", "picture", "price", "status"],
        },
        {
          model: User,
          attributes: ["id", "name", "email", "picture", "phone_number", "address", "city"],
        },
      ],
      where: {
        id_user: user,
      },
    });
  },
  updateOrder(id, data) {
    return Order.update(
      {
        price: data,
        status: "bid",
      },
      {
        where: { id },
      }
    );
  },

  historySeller(user) {
    return Order.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "name", "picture", "price", "status"],
          where: {
            id_user: user,
            status: "sold",
          },
        },
        {
          model: User,
          attributes: ["id", "name", "email", "picture", "phone_number", "address", "city"],
        },
      ],
    });
  },
  historyBuyer(user) {
    return Order.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "name", "picture", "price", "status"],
        },
        {
          model: User,
          attributes: ["id", "name", "email", "picture", "phone_number", "address", "city"],
        },
      ],
      where: {
        id_user: user,
        status: "accepted",
      },
    });
  },
};
