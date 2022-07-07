const productServices = require("../productServices");

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
    it("should return data products", () => {
      const data = {
        name: "Sepatu Futsal Putih",
        picture: "https://i.pravatar.cc/300",
        price: 1000,
        location: "Bandung",
        description: "Sepatu futsal putih, bahan berkualitas",
        id_category_product: 1,
      };

      const id_user = 1;

      const url = "https://i.pravatar.cc/300";

      const product = productServices.create(data, id_user, url);

      expect(product).toBeDefined();
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
    it("should return data product", async () => {
      const data = {
        id: 2,
      };

      const product = await productServices.find(data);

      expect(product).toBeDefined();
    });
  });

  describe("update", () => {
    it("should return data product", async () => {
      const id = 2;
      const data = {
        name: "Sepatu Futsal Putih",
        price: 1000,
        location: "Bandung",
        description: "Sepatu futsal putih, bahan berkualitas",
        id_category_product: 1,
      };

      const url = "http://localhost:3000/products/1";

      const product = await productServices.update(id, data, url);

      expect(product).toBeDefined();
    });

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
    it("should return data product", async () => {
      const id = 2;

      const product = await productServices.delete(id);

      expect(product).toBeDefined();
    });

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

    it("should return error", async () => {
      try {
        await productServices.findAllAvailable();
      } catch (error) {
        expect(error).toHaveProperty("name");
        expect(error).toHaveProperty("message");
      }
    });
  });

  describe("filterByCategory", () => {
    it("should return data product", async () => {
      const category = "Hobi";

      const product = await productServices.filterByCategory(category);

      expect(product).toBeDefined();
    });
  });
});
