const orderServices = require("../../../services/orderServices");
const notificationServices = require("../../../services/notificationServices");

module.exports = {
  async findBidProduct(req, res) {
    try {
      const user = req.user;
      const product = await orderServices.findBidProduct(user);
      res.json({
        status: "success",
        product,
      });
    } catch (error) {
      res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  },
  async findById(req, res) {
    try {
      const id = req.params.id;
      const order = await orderServices.findById(id);
      res.json({
        status: "success",
        order,
      });
    } catch (error) {
      if (error.name === "orderNotFound") {
        res.status(404).json({
          name: error.name,
          message: error.message,
        });
      }
      res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  },
  async updateStatus(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      await orderServices.updateStatus(id, data);
      await notificationServices.createNotification(id);
      res.json({
        status: "success",
        message: "order updated successfully",
      });
    } catch (error) {
      if (error.name === "orderNotFound") {
        res.status(404).json({
          name: error.name,
          message: error.message,
        });
      }
      res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  },

  // buyer
  async createOrder(req, res) {
    try {
      const data = req.body;
      const user = req.user;
      const order = await orderServices.createOrder(data, user);
      await notificationServices.createNotification(order.id);
      res.json({
        status: "success",
        order,
      });
    } catch (error) {
      res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  },

  async findOrderByUser(req, res) {
    try {
      const user = req.user;
      const orders = await orderServices.findOrderByUser(user);
      res.json({
        status: "success",
        orders,
      });
    } catch (error) {
      res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  },

  async updateOrder(req, res) {
    try {
      const id = req.params.id;
      const data = req.body.price;
      await orderServices.updateOrder(id, data);
      await notificationServices.createNotification(id);
      res.json({
        status: "success",
        message: "order updated successfully",
      });
    } catch (error) {
      if (error.name === "orderNotFound") {
        res.status(404).json({
          name: error.name,
          message: error.message,
        });
      }
      res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  },

  // history
  async historyUser(req, res) {
    try {
      const user = req.user;
      const seller = await orderServices.historySeller(user);
      const buyer = await orderServices.historyBuyer(user);
      res.json({
        status: "success",
        Seller: seller,
        Buyer: buyer,
      });
    } catch (error) {
      res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  },

  async findOneHistory(req, res) {
    try {
      const id = req.params.id;
      const order = await orderServices.findById(id);
      res.json({
        status: "success",
        order,
      });
    } catch (error) {
      if (error.name === "orderNotFound") {
        res.status(404).json({
          name: error.name,
          message: error.message,
        });
      }
      res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  },
};
