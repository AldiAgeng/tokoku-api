const { Notification, Order, Product } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  createNotification(id, status) {
    return Notification.create({
      id_order: id,
      status,
    });
  },
  findNotificationSeller(user) {
    return Notification.findAll({
      include: [
        {
          model: Order,
          attributes: ["id", "price", "status", "id_user"],
          include: [
            {
              model: Product,
              attributes: ["name", "price", "picture", "id_user"],
              where: {
                id_user: user.id,
              },
            },
          ],
        },
      ],
      where: {
        status: "bid",
      },
      order: [["updatedAt", "DESC"]],
    });
  },
  findNotificationBuyer(user) {
    return Notification.findAll({
      include: [
        {
          model: Order,
          attributes: ["id", "price", "status", "id_user"],
          where: {
            id_user: user.id,
          },
          include: [
            {
              model: Product,
              attributes: ["name", "price", "picture", "id_user"],
            },
          ],
        },
      ],
      where: {
        status: {
          [Op.in]: ["accepted", "rejected"],
        },
      },
      order: [["updatedAt", "DESC"]],
    });
  },
  findOneNotification(id) {
    return Notification.findOne({
      include: [
        {
          model: Order,
          attributes: ["id", "price", "status", "id_user"],
          include: [
            {
              model: Product,
              attributes: ["name", "price", "picture", "id_user"],
            },
          ],
        },
      ],
      where: {
        id,
      },
    });
  },
  updateNotification(id) {
    return Notification.update(
      {
        is_read: true,
      },
      {
        where: {
          id,
        },
      }
    );
  },
};
