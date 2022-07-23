const productServices = require("../productServices");
const fs = require("fs");
const { sequelize } = require("../../models");

const { queryInterface } = sequelize;

afterAll(async () => {
  await queryInterface.bulkDelete("Products", null, {
    truncate: true,
    restartIdentity: true,
  });
});

describe("productServices", () => {
  describe("findProductByUser", () => {
    it("should return data product", async () => {
      const user = 1;

      const product = await productServices.findProductByUser(user);

      expect(product).toBeDefined();
    });

    it("should throw error", async () => {
      try {
        await productServices.findProductByUser();
      } catch (error) {
        expect(error).toHaveProperty("name");
        expect(error).toHaveProperty("message");
      }
    });
  });

  describe("create", () => {
    // it("should return data products", async () => {
    //   const data = {
    //     name: "Sepatu Futsal Putih",
    //     price: 1000,
    //     location: "Bandung",
    //     status: "available",
    //     description: "Sepatu futsal putih, bahan berkualitas",
    //     id_category_product: 1,
    //     picture: {
    //       buffer: fs.readFile("./app/services/test/baju-windah.jpg", "base64", (err, data) => {
    //         return data;
    //       }),
    //       mimetype: "image/jpeg",
    //     },
    //   };

    //   console.log(data, "data");

    //   const id_user = 1;

    //   const product = await productServices.create(data, id_user);
    //   expect(product).toBeDefined();
    // });

    it("should throw error", async () => {
      try {
        const url = "https://i.pravatar.cc/300";

        await productServices.create(url);
      } catch (error) {
        expect(error).toHaveProperty("name");
        expect(error).toHaveProperty("message");
      }
    });
  });

  describe("find", () => {
    it("should return error productNotFound", async () => {
      const data = {
        id: 100,
      };

      try {
        await productServices.find(data);
      } catch (error) {
        expect(error).toHaveProperty("name");
        expect(error).toHaveProperty("message");
      }
    });
  });

  describe("update", () => {
    // it("should return data product", async () => {
    //   const id = 3;
    //   const data = {
    //     name: "Sepatu Futsal Putih",
    //     price: 1000,
    //     location: "Bandung",
    //     status: "available",
    //     description: "Sepatu futsal putih, bahan berkualitas",
    //     id_category_product: 1,
    //     picture: {
    //       buffer: fs.readFile("./app/services/test/baju-windah.jpg", "base64", (err, data) => {
    //         return data;
    //       }),
    //       mimetype: "image/jpeg",
    //     },
    //   };

    //   const product = await productServices.update(id, data);

    //   expect(product).toBeUndefined();
    // });

    it("should return error product not found", async () => {
      const id = 100;
      const data = {
        name: "Sepatu Futsal Putih",
        picture: "https://i.pravatar.cc/300",
        price: 1000,
        location: "Bandung",
        description: "Sepatu futsal putih, bahan berkualitas",
        id_category_product: 1,
        id_user: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const url = "http://localhost:3000/products/1";

      try {
        await productServices.update(id, data, url);
      } catch (error) {
        expect(error).toHaveProperty("name");
        expect(error).toHaveProperty("message");
      }
    });
  });

  describe("delete", () => {
    // it("should return data product", async () => {
    //   const id = 2;

    //   const product = await productServices.delete(id);

    //   expect(product).toBeDefined();
    // });

    it("should return error product not found", async () => {
      const id = 100;

      try {
        await productServices.delete(id);
      } catch (error) {
        expect(error).toHaveProperty("name");
        expect(error).toHaveProperty("message");
      }
    });
  });

  describe("findAllAvailable", () => {
    it("should return data product", async () => {
      const product = await productServices.findAllAvailable();

      expect(product).toBeDefined();
    });
  });

  describe("filter", () => {
    it("should return data product by category", async () => {
      const params = {
        query: {
          category: "Hobi",
        },
      };

      const product = await productServices.filter(params.query);

      expect(product).toBeDefined();
    });

    it("should return data product by name/search", async () => {
      const params = {
        query: {
          search: "Sepatu",
        },
      };

      const product = await productServices.filter(params.query);

      expect(product).toBeDefined();
    });

    it("should return error", async () => {
      try {
        const params = {
          query: {
            error: "Sepatu",
          },
        };
        await productServices.filter(params.query.test);
      } catch (error) {
        expect(error).toHaveProperty("name");
        expect(error).toHaveProperty("message");
      }
    });
  });
});
