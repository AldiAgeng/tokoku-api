const { orderRepository } = require("../../repositories");
const { sequelize } = require("../../models");

const { queryInterface } = sequelize;

beforeAll(async () => {
  await queryInterface.bulkInsert(
    "Orders",
    [
      {
        price: 1000,
        status: "pending",
        id_product: 1,
        id_user: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
});

afterAll(async () => {
  await queryInterface.bulkDelete("Orders", null, {
    truncate: true,
    restartIdentity: true,
  });
});

describe("OrderRepository", () => {
  describe("create", () => {
    it("should create an order", async () => {
      const order = await orderRepository.create({
        price: 1000,
        status: "pending",
        id_product: 1,
        id_user: 1,
      });

      expect(order).toBeDefined();
      expect(order.price).toBe(1000);
      expect(order.status).toBe("pending");
      expect(order.id_product).toBe(1);
      expect(order.id_user).toBe(1);
    });
  });

  describe("findAll", () => {
    it("should find all orders", async () => {
      const orders = await orderRepository.findAll();

      expect(orders.length >= 0).toBe(true);
    });
  });

  describe("find", () => {
    it("should find an order by id", async () => {
      const order = await orderRepository.find(1);

      expect(order).toBeDefined();
      expect(order.price).toBe(1000);
      expect(order.status).toBe("pending");
      expect(order.id_product).toBe(1);
      expect(order.id_user).toBe(1);
    });
  });

  describe("update", () => {
    it("should update an order", async () => {
      const order = await orderRepository.update(1, {
        price: 2000,
        status: "paid",
        id_product: 1,
        id_user: 1,
      });

      expect(order.length).toBe(1);
    });
  });

  describe("delete", () => {
    it("should delete an order", async () => {
      const order = await orderRepository.delete(1);

      expect(order).toBe(1);
    });
  });
});
