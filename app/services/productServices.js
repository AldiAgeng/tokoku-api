const productRepository = require("../repositories/productRepository");

module.exports = {
  async findProductByUser(user) {
    try {
      return await productRepository.findProductByUser(user);
    } catch (error) {
      throw error;
    }
  },
  async create(data, user) {
    try {
      const count = await productRepository.countByStatusAndUser(user);
      if (count >= 4) {
        throw {
          name: "badRequest",
          message: "You can only create 4 products available",
        };
      }

      return productRepository.create(data, user);
    } catch (error) {
      throw error;
    }
  },
  async find(data) {
    try {
      if (!data.params.id) {
        throw {
          name: "badRequest",
          message: "Id is required",
        };
      }

      const product = await productRepository.find(data.params.id);
      if (!product) {
        throw {
          name: "productNotFound",
          message: "Product is not found",
        };
      }
      return product;
    } catch (error) {
      throw error;
    }
  },
  async update(id, data) {
    try {
      const product = await productRepository.find(id);
      if (!product) {
        throw {
          name: "productNotFound",
          message: "Product is not found",
        };
      }

      return productRepository.update(id, data);
    } catch (error) {
      throw error;
    }
  },

  async delete(id) {
    try {
      const product = await productRepository.find(id);
      if (!product) {
        throw {
          name: "productNotFound",
          message: "Product is not found",
        };
      }

      return productRepository.delete(id);
    } catch (error) {
      throw error;
    }
  },
};
