const productRepository = require("../productRepository");

describe("productRepository", () => {
  describe("findProductByUser", () => {
    it("should return a product by user", async () => {
      const product = await productRepository.findProductByUser(1);

      expect(product.length >= 0).toBe(true);
      expect(product).toBeDefined();
    });
  });

  describe("find", () => {
    it("should find product by id", async () => {
      const product = await productRepository.find(1);

      expect(product).toBeDefined();
    });
  });

  describe("create", () => {
    it("should create a new product", async () => {
      const product = await productRepository.create(
        {
          name: "Sepatu Futsal Putih",
          price: 1000,
          location: "Bandung",
          description: "Sepatu futsal putih, bahan berkualitas",
          id_category_product: 1,
          id_user: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        1,
        "picture"
      );

      expect(product).toBeDefined();
    });
  });

  describe("update", () => {
    it("should update product", async () => {
      const product = await productRepository.update(
        1,
        {
          name: "product",
          picture: "picture",
          price: 100,
          location: "location",
          description: "description",
          status: "sold",
          id_category_product: 1,
          id_user: 1,
        },
        "picture"
      );

      expect(product.length).toBe(1);
      expect(product).toBeDefined();
    });
  });

  // describe("countByStatusAndUser", () => {
  //   it("should count product by status and user", async () => {
  //     const product = await productRepository.countByStatusAndUser({
  //       id_user: 1,
  //     });

  //     console.log("coy", product);
  //   });
  // });

  describe("findAllAvailable", () => {
    it("should find all product available", async () => {
      const product = await productRepository.findAllAvailable();

      expect(product.length >= 0).toBe(true);
      expect(product).toBeDefined();
    });
  });

  describe("filterByCategory", () => {
    it("should filter product by category", async () => {
      const product = await productRepository.filterByCategory("Hobi");

      expect(product.length >= 0).toBe(true);
      expect(product).toBeDefined();
    });
  });

  describe("delete", () => {
    it("should delete product", async () => {
      const product = await productRepository.delete(1);

      expect(product).toBeDefined();
    });
  });
});
