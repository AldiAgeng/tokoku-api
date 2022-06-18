const orderServices = require("../orderServices");
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

describe("orderServices", () => {
  describe("createOrder", () => {
    it("should create data order", () => {
      const order = {
        price: 1000,
        status: "pending",
        id_product: 1,
        id_user: 1,
      };

      const result = orderServices.createOrder(order);

      expect(result).toBeDefined();
      expect(result.price).toBe(1000);
      expect(result.status).toBe("pending");
      expect(result.id_product).toBe(1);
      expect(result.id_user).toBe(1);
    });
  });

  describe("historyOrder", () => {
    it("should return data order", () => {
      mockUser = {
        id: 1,
      };

      const result = orderServices.history(mockUser.id);

      expect(result).toBeDefined();
    });
  });

  describe("notification", () => {
    it("should return data order", () => {
      mockUser = {
        id: 1,
      };

      const result = orderServices.notification(mockUser.id);

      expect(result).toBeDefined();
    });
  });

  describe("findOrder", () => {
    it("should return data order", () => {
      mockOrder = {
        id: 1,
      };
      const result = orderServices.findOrder(mockOrder.id);

      expect(result).toBeDefined();
    });
  });

  describe("updateOrder", () => {
    it("should return data order", () => {
      mockUser = {
        id: 1,
      };
      const mockBody = {
        price: 1000,
        status: "deal",
        id_product: 1,
        id_user: mockUser.id,
      };

      const result = orderServices.update(mockUser.id, mockBody);

      expect(result).toBeDefined();
    });
  });
});
