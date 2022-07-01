const orderRepository = require("../repositories/orderRepository");

module.exports = {
  findBidProduct(user) {
    try {
      return orderRepository.findBidProduct(user.id);
    } catch (error) {
      throw error;
    }
  },
  async findById(id) {
    try {
      const order = await orderRepository.findById(id);
      if (!order) {
        throw {
          name: "orderNotFound",
          message: "Order is not found",
        };
      }
      return order;
    } catch (error) {
      throw error;
    }
  },
  async updateStatus(id, data) {
    try {
      const order = await orderRepository.findById(id);
      if (!order) {
        throw {
          name: "orderNotFound",
          message: "Order is not found",
        };
      }
      return orderRepository.updateStatus(id, data.status);
    } catch (error) {
      throw error;
    }
  },

  // buyer
  createOrder(data, user) {
    try {
      return orderRepository.createOrder(data, user.id);
    } catch (error) {
      throw error;
    }
  },

  findOrderByUser(user) {
    try {
      return orderRepository.findOrderByUser(user.id);
    } catch (error) {
      throw error;
    }
  },
  async updateOrder(id, data) {
    try {
      const order = await orderRepository.findById(id);
      if (!order) {
        throw {
          name: "orderNotFound",
          message: "Order is not found",
        };
      }
      return await orderRepository.updateOrder(id, data);
    } catch (error) {
      throw error;
    }
  },

  // history
  historySeller(user) {
    try {
      return orderRepository.historySeller(user.id);
    } catch (error) {
      throw error;
    }
  },
  historyBuyer(user) {
    try {
      return orderRepository.historyBuyer(user.id);
    } catch (error) {
      throw error;
    }
  },
};
