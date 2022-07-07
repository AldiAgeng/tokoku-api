const orderServices = require("../orderServices");
const { sequelize } = require("../../models");

const { queryInterface } = sequelize;

afterAll(async () => {
  await queryInterface.bulkDelete("Orders", null, {
    truncate: true,
    restartIdentity: true,
  });
});

describe("orderServices", () => {
  describe("createOrder", () => {
    it("should create data order", () => {
      const data = {
        price: 1000,
        status: "bid",
        id_product: 1,
        id_user: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const user = {
        id: 1,
      };

      const url = "http://localhost:3000/orders/1";

      return orderServices.createOrder(data, user, url);
    });

    it("should throw error", () => {
      try {
        orderServices.createOrder();
      } catch (error) {
        expect(error).toHaveProperty("name");
        expect(error).toHaveProperty("message");
      }
    });
  });

  describe("findBidProduct", () => {
    it("should return data product", async () => {
      const user = {
        id: 1,
      };

      const product = await orderServices.findBidProduct(user);

      expect(product).toBeDefined();
    });

    it("should throw error", async () => {
      try {
        await orderServices.findBidProduct();
      } catch (error) {
        expect(error).toHaveProperty("name");
        expect(error).toHaveProperty("message");
      }
    });
  });

  describe("findById", () => {
    it("should return data order", async () => {
      const order = await orderServices.findById(1);

      expect(order).toBeDefined();
    });

    it("should throw error orderNotFound", async () => {
      try {
        await orderServices.findById();
      } catch (error) {
        expect(error).toHaveProperty("name");
        expect(error).toHaveProperty("message");
      }
    });
  });

  describe("updateStatus", () => {
    it("should return data order", async () => {
      const id = 1;
      const data = {
        status: "accepted",
      };

      const order = await orderServices.updateStatus(id, data);

      expect(order).toBeDefined();
    });

    it("should throw error orderNotFound", async () => {
      try {
        await orderServices.updateStatus();
      } catch (error) {
        expect(error).toHaveProperty("name");
        expect(error).toHaveProperty("message");
      }
    });
  });

  describe("findOrderByUser", () => {
    it("should return data order", async () => {
      const user = {
        id: 1,
      };

      const order = await orderServices.findOrderByUser(user);

      expect(order).toBeDefined();
    });

    it("should throw error", async () => {
      try {
        await orderServices.findOrderByUser();
      } catch (error) {
        expect(error).toHaveProperty("name");
        expect(error).toHaveProperty("message");
      }
    });
  });

  describe("updateOrder", () => {
    it("should return data order", async () => {
      const id = 1;
      const data = {
        price: 1000,
      };

      const order = await orderServices.updateOrder(id, data.price);

      expect(order).toBeDefined();
    });

    it("should throw error", async () => {
      try {
        await orderServices.updateOrder();
      } catch (error) {
        expect(error).toHaveProperty("name");
        expect(error).toHaveProperty("message");
      }
    });
  });

  // history
  describe("historySeller", () => {
    it("should return data order", async () => {
      const user = {
        id: 1,
      };

      const order = await orderServices.historySeller(user);

      expect(order).toBeDefined();
    });
    it("should throw error", async () => {
      try {
        await orderServices.historySeller();
      } catch (error) {
        expect(error).toHaveProperty("name");
        expect(error).toHaveProperty("message");
      }
    });
  });

  describe("historyBuyer", () => {
    it("should return data order", async () => {
      const user = {
        id: 1,
      };

      const order = await orderServices.historyBuyer(user);

      expect(order).toBeDefined();
    });
    it("should throw error", async () => {
      try {
        await orderServices.historyBuyer();
      } catch (error) {
        expect(error).toHaveProperty("name");
        expect(error).toHaveProperty("message");
      }
    });
  });
});
