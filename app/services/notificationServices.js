const notificationRepository = require("../repositories/notificationRepository");

module.exports = {
  createNotification(data) {
    try {
      return notificationRepository.createNotification(data);
    } catch (error) {
      throw error;
    }
  },
  async findNotificationUser(user) {
    try {
      const buyer = await notificationRepository.findNotificationBuyer(user);
      const seller = await notificationRepository.findNotificationSeller(user);

      return { buyer, seller };
    } catch (error) {
      throw error;
    }
  },
  async findOneNotification(id) {
    try {
      const notification = await notificationRepository.findOneNotification(id);
      if (!notification) {
        throw {
          name: "notificationNotFound",
          message: "Notification not found",
        };
      }
      return notification;
    } catch (error) {
      throw error;
    }
  },
  async updateNotification(id) {
    try {
      const notification = await notificationRepository.findOneNotification(id);
      if (!notification) {
        throw {
          name: "notificationNotFound",
          message: "Notification not found",
        };
      }
      return notificationRepository.updateNotification(id);
    } catch (error) {
      throw error;
    }
  },
};
