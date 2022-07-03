const notificationRepository = require("../repositories/notificationRepository");

module.exports = {
  createNotification(data) {
    try {
      return notificationRepository.createNotification(data);
    } catch (error) {
      throw error;
    }
  },
  findNotificationSeller(user) {
    try {
      return notificationRepository.findNotificationSeller(user.id);
    } catch (error) {
      throw error;
    }
  },
  findNotificationBuyer(user) {
    try {
      return notificationRepository.findNotificationBuyer(user.id);
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
};
