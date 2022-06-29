const orderServices = require("../../../services/orderServices");

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
      res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  },
};
