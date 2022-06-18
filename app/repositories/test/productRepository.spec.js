const productRepository = require("../productRepository");

describe("productRepository", () => {
  describe("create", () => {
    it("should create a new product", async () => {
      const product = await productRepository.create({
        name: "Sepatu Futsal Putih",
        picture: "https://i.pravatar.cc/300",
        price: 1000,
        location: "Bandung",
        description: "Sepatu futsal putih, bahan berkualitas",
        id_category_product: 1,
        id_user: 1,
      });

      expect(product.name).toBe("Sepatu Futsal Putih");
      expect(product.picture).toBe("https://i.pravatar.cc/300");
      expect(product.price).toBe(1000);
      expect(product.location).toBe("bandung");
      expect(product.description).toBe("Sepatu futsal putih, bahan berkualitas");
      expect(product.id_category_product).toBe(1);
      expect(product.id_user).toBe(1);
    });
  });

  describe("findAll", () => {
    it("should find all products", async () => {
      const products = await productRepository.findAll();

      expect(products.length >= 0).toBe(true);
    });
  });

  describe("find", () => {
    it("should find product by id", async () => {
      const product = await productRepository.find(1);

      expect(product.name).toBe("Sepatu Futsal Putih");
      expect(product.picture).toBe("https://i.pravatar.cc/300");
      expect(product.price).toBe(1000);
      expect(product.location).toBe("bandung");
      expect(product.description).toBe("Sepatu futsal putih, bahan berkualitas");
      expect(product.id_category_product).toBe(1);
      expect(product.id_user).toBe(1);
    });
  });

  describe("update", () => {
    it("should update product", async () => {
      const product = await productRepository.update(1, {
        name: "Sepatu Futsal Putih",
        picture: "https://i.pravatar.cc/300",
        price: 1000,
        location: "Bandung",
        description: "Sepatu futsal putih, bahan berkualitas",
        id_category_product: 1,
        id_user: 1,
      });

      expect(product.length).toBe(1);
    });
  });

  describe("delete", () => {
    it("should delete product", async () => {
      const product = await productRepository.delete(1);

      expect(product).toBe(1);
    });
  });
});
