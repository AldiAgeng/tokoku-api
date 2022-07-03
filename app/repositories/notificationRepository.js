const { Notification, Order, Product, User } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  createNotification(data) {
    return Notification.create({
      id_order: data,
    });
  },
  findNotificationSeller(user) {
    return Notification.findAll({
      include: [
        {
          model: Order,
          attributes: ["id", "status"],
          include: [
            {
              model: Product,
              attributes: ["name", "price"],
              where: {
                id_user: user,
              },
            },
          ],
        },
      ],
    });
  },
  findNotificationBuyer(user) {
    return Notification.findAll({
      include: [
        {
          model: Order,
          attributes: ["id", "status"],
          where: {
            id_user: user,
            status: {
              [Op.in]: ["accepted", "rejected"],
            },
          },
          include: [
            {
              model: Product,
              attributes: ["name", "price"],
            },
          ],
        },
      ],
    });
  },
  findOneNotification(id) {
    return Notification.findOne({
      include: [
        {
          model: Order,
          attributes: ["id", "status"],
          include: [
            {
              model: Product,
              attributes: ["name", "price"],
            },
          ],
        },
      ],
      where: {
        id,
      },
    });
  },
};
