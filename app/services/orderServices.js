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
  async update(id, data) {
    try {
      const order = await orderRepository.findById(id);
      if (!order) {
        throw {
          name: "orderNotFound",
          message: "Order is not found",
        };
      }
      return orderRepository.update(id, data);
    } catch (error) {
      throw error;
    }
  },
};
