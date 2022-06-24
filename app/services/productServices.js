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
      if (!data.name || !data.picture || !data.price || !data.location || !data.description || !data.status || !data.id_category_product) {
        throw {
          name: "badRequest",
          message: "Please fill all field",
        };
      }

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
  async find(id) {
    try {
      if (!id) {
        throw {
          name: "badRequest",
          message: "Please fill in id",
        };
      }

      const product = await productRepository.find(id);
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
      if (!id) {
        throw {
          name: "badRequest",
          message: "Please fill in id",
        };
      }

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
      if (!id) {
        throw {
          name: "badRequest",
          message: "Please fill in id",
        };
      }

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
