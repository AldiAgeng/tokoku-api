const productRepository = require("../repositories/productRepository");
const cloudinary = require("../utils/cloudinary");

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

      const fileBase64 = data.picture.buffer.toString("base64");
      const file = `data:${data.picture.mimetype};base64,${fileBase64}`;

      const picture = cloudinary.uploader.upload(file, { folder: "products" }, function (error, result) {
        if (error) {
          return error;
        } else {
          console.log("success upload", result);
        }
      });
      return await productRepository.create(data, user, (await picture).url);
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
  async update(id, data) {
    try {
      const product = await productRepository.find(id);
      if (!product) {
        throw {
          name: "productNotFound",
          message: "Product is not found",
        };
      }

      if (product.picture !== null) {
        if (data.picture) {
          const public_id = product.picture.replace(/(.*)([\/](\w+))(\.(jpg|png|jpeg))/gm, "$3");

          await cloudinary.uploader.destroy(`products/${public_id}`);
        }
      } else {
        if (!data.picture) {
          throw {
            name: "badRequest",
            message: "please fill all required fields and make sure the data is valid",
          };
        }
      }

      if (data.picture) {
        if (!data.picture.buffer) {
          await productRepository.update(id, data);
        } else {
          const fileBase64 = data.picture.buffer.toString("base64");
          const file = `data:${data.picture.mimetype};base64,${fileBase64}`;
          cloudinary.uploader.upload(file, { folder: "products" }, async function (error, result) {
            if (error) {
              return error;
            } else {
              await productRepository.update(id, data, result.url);
            }
          });
        }
      } else {
        await productRepository.update(id, data);
      }
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

      const public_id = product.picture.replace(/(.*)([\/](\w+))(\.(jpg|png|jpeg))/gm, "$3");

      await cloudinary.uploader.destroy(`products/${public_id}`);

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
