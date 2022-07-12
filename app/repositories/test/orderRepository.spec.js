const orderRepository = require("../orderRepository");

describe("OrderRepository", () => {
  describe("findBidProduct", () => {
    it("should return a order by user", async () => {
      const product = await orderRepository.findBidProduct(1);

      expect(product.length >= 0).toBe(true);
      expect(product).toBeDefined();
    });
  });

  describe("findById", () => {
    it("should return a order by id", async () => {
      const product = await orderRepository.findById(1);

      expect(product).toBeDefined();
    });

    describe("updateStatus", () => {
      it("should return a order by id", async () => {
        const product = await orderRepository.updateStatus(1, "bid");

        expect(product).toBeDefined();
      });
    });
  });

  describe("createOrder", () => {
    it("should create an order", async () => {
      const product = await orderRepository.createOrder(
        {
          id_product: 1,
          id_user: 1,
          status: "bid",
        },
        1
      );

      expect(product).toBeDefined();
    });
  });

  describe("findOrderByUser", () => {
    it("should return a order by user", async () => {
      const product = await orderRepository.findOrderByUser(1);

      expect(product).toBeDefined();
    });
  });

  describe("updateOrder", () => {
    it("should update an order", async () => {
      const product = await orderRepository.updateOrder(1, 1000);

      expect(product).toBeDefined();
    });
  });

  describe("historySeller", () => {
    it("should return a order by user", async () => {
      const product = await orderRepository.historySeller(1);

      expect(product.length >= 0).toBe(true);
      expect(product).toBeDefined();
    });
  });

  describe("historyBuyer", () => {
    it("should return a order by user", async () => {
      const product = await orderRepository.historyBuyer(1);

      expect(product.length >= 0).toBe(true);
      expect(product).toBeDefined();
    });
  });
});
