const productServices = require("../../../services/productServices");

module.exports = {
  async findProductByUser(req, res) {
    try {
      const user = req.user.id;
      const products = await productServices.findProductByUser(user);

      res.status(200).json({
        status: "success",
        data: products,
      });
    } catch (error) {
      if (error.name === "badRequest") {
        res.status(400).json({
          name: error.name,
          message: error.message,
        });
      } else {
        res.status(500).json(error.message);
      }
    }
  },
  async create(req, res) {
    try {
      const user = req.user.id;
      const data = req.body;
      const product = await productServices.create(data, user);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async find(req, res) {
    try {
      const id = req.params.id;
      const product = await productServices.find(id);
      res.status(200).json({
        status: "success",
        data: product,
      });
    } catch (error) {
      if (error.name === "productNotFound") {
        res.status(404).json({
          name: error.name,
          message: error.message,
        });
      } else {
        res.status(500).json(error);
      }
    }
  },
  async update(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      const product = await productServices.update(id, data);
      res.status(200).json({
        status: "success",
        data: product,
      });
    } catch (error) {
      if (error.name === "productNotFound") {
        res.status(404).json({
          name: error.name,
          message: error.message,
        });
      }

      if (error.name === "badRequest") {
        res.status(400).json({
          name: error.name,
          message: error.message,
        });
      }

      res.status(500).json(error);
    }
  },
  async delete(req, res) {
    try {
      const id = req.params.id;
      const product = await productServices.delete(id);
      res.status(200).json({
        status: "data deleted",
        data: product,
      });
    } catch (error) {
      if (error.name === "productNotFound") {
        res.status(404).json({
          name: error.name,
          message: error.message,
        });
      }
    }

    if (error.name === "badRequest") {
      res.status(400).json({
        name: error.name,
        message: error.message,
      });
    }

    res.status(500).json(error);
  },
};