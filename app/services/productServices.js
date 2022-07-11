const productRepository = require("../repositories/productRepository");
const { deletePictureProduct } = require("../utils/delete");

module.exports = {
  async findProductByUser(user) {
    try {
      return await productRepository.findProductByUser(user);
    } catch (error) {
      throw error;
    }
  },
  async create(data, user, url) {
    try {
      const count = await productRepository.countByStatusAndUser(user);
      if (count >= 4) {
        throw {
          name: "badRequest",
          message: "You can only create 4 products available",
        };
      }

      return productRepository.create(data, user, url);
    } catch (error) {
      throw error;
    }
  },
  async find(data) {
    try {
      const product = await productRepository.find(data.id);
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
  async update(id, data, url) {
    try {
      const product = await productRepository.find(id);
      if (!product) {
        throw {
          name: "productNotFound",
          message: "Product is not found",
        };
      }

      if (product.picture !== null) {
        if (url) {
          deletePictureProduct(product.picture);
        }
      } else {
        if (!url) {
          throw {
            name: "badRequest",
            message: "please fill all required fields and make sure the data is valid",
          };
        }
      }

      return productRepository.update(id, data, url);
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

      deletePictureProduct(product.picture);

      return productRepository.delete(id);
    } catch (error) {
      throw error;
    }
  },

  // buyer
  findAllAvailable() {
    try {
      return productRepository.findAllAvailable();
    } catch (error) {
      throw error;
    }
  },
  filter(data) {
    try {
      if (data.category) {
        return productRepository.filterByCategory(data.category);
      }
      if (data.search) {
        return productRepository.filterByProduct(data.search);
      }
    } catch (error) {
      throw error;
    }
  },
};
