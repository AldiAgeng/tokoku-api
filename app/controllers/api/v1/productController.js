const productServices = require("../../../services/productServices");
// test ci
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
      res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  },
  async create(req, res) {
    try {
      if (req.file) {
        const user = req.user.id;
        const data = req.body;
        data.picture = req.file;
        const product = await productServices.create(data, user);
        res.status(200).json({
          status: "success",
          data: product,
        });
      } else {
        throw {
          name: "badRequest",
          message: "please fill all required fields and make sure the data is valid",
        };
      }
    } catch (error) {
      if (error.name === "badRequest" || error.name === "SequelizeValidationError") {
        res.status(400).json({
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
  async find(req, res) {
    try {
      const id = req.params;
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
        res.status(500).json({
          name: error.name,
          message: error.message,
        });
      }
    }
  },
  async update(req, res) {
    try {
      if (req.file) {
        const data = req.body;
        data = req.file;
        await productServices.update(req.params.id, data);
        res.status(200).json({
          status: "success",
          message: "product updated successfully",
        });
      } else {
        await productServices.update(req.params.id, req.body);
        res.status(200).json({
          status: "success",
          message: "product updated successfully",
        });
      }
    } catch (error) {
      if (error.name === "productNotFound") {
        res.status(404).json({
          name: error.name,
          message: error.message,
        });
      } else if (error.name === "badRequest" || error.name === "SequelizeValidationError") {
        res.status(400).json({
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
  async delete(req, res) {
    try {
      const id = req.params.id;
      await productServices.delete(id);
      res.status(200).json({
        status: "success",
        message: "product deleted successfully",
      });
    } catch (error) {
      if (error.name === "productNotFound") {
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

  // buyer
  async findAllAvailable(req, res) {
    try {
      if (req.query.category || req.query.search) {
        const products = await productServices.filter(req.query);
        res.status(200).json({
          status: "success",
          data: products,
        });
      } else {
        const products = await productServices.findAllAvailable();
        res.status(200).json({
          status: "success",
          data: products,
        });
      }
    } catch (error) {
      res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  },
};
