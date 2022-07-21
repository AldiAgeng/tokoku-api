const notificationServices = require("../../../services/notificationServices");

module.exports = {
  async findNotificationByUser(req, res) {
    try {
      const user = req.user;
      const notif = await notificationServices.findNotificationUser(user);
      res.json({
        status: "success",
        data: notif,
      });
    } catch (error) {
      res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  },
  async findOneNotification(req, res) {
    try {
      const id = req.params.id;
      const notification = await notificationServices.findOneNotification(id);
      res.json({
        status: "success",
        data: notification,
      });
    } catch (error) {
      if (error.name === "notificationNotFound") {
        res.status(404).json({
          name: error.name,
          message: error.message,
        });
      } else {
        res.status(500).json({
          name: error.name,
          message: error.message,
        });
      }
    }
  },
  async updateNotification(req, res) {
    try {
      const id = req.params.id;
      await notificationServices.updateNotification(id);
      res.json({
        status: "success",
        message: "notification updated successfully",
      });
    } catch (error) {
      if (error.name === "notificationNotFound") {
        res.status(404).json({
          name: error.name,
          message: error.message,
        });
      } else {
        res.status(500).json({
          name: error.name,
          message: error.message,
        });
      }
    }
  },
};
