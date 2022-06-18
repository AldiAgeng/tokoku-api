const productServices = require("../productService");
const { sequelize } = require("../../models");

const { queryInterface } = sequelize;

beforeAll(async () => {
  await queryInterface.bulkInsert(
    "Products",
    [
      {
        name: "Sepatu Futsal Putih",
        picture: "https://i.pravatar.cc/300",
        price: 1000,
        location: "Bandung",
        description: "Sepatu futsal putih, bahan berkualitas",
        id_category_product: 1,
        id_user: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
});

afterAll(async () => {
  await queryInterface.bulkDelete("Products", null, {
    truncate: true,
    restartIdentity: true,
  });
});

describe("productServices", () => {
  describe("getAllProduct", () => {
    it("should return data products", () => {
      const data = productServices.getAllProduct();

      expect(data).toBeDefined();
    });
  });

  describe("getProductById", () => {
    it("should return data products", () => {
      const data = productServices.getProductById(1);

      expect(data).toBeDefined();
    });
  });

  describe("createProduct", () => {
    it("should return data products", () => {
      const mockUser = {
        id: 1,
      };
      const mockCategoryProduct = {
        id: 1,
      };
      const data = productServices.createProduct({
        name: "Sepatu Futsal Putih",
        picture: "https://i.pravatar.cc/300",
        price: 1000,
        location: "Bandung",
        description: "Sepatu futsal putih, bahan berkualitas",
        id_category_product: mockCategoryProduct.id,
        id_user: mockUser.id,
      });

      expect(data).toBeDefined();
    });
  });

  describe("getProductByUser", () => {
    it("should return data products", () => {
      const mockUser = {
        id: 1,
      };
      const data = productServices.getProductByUser(mockUser.id);

      expect(data).toBeDefined();
    });
  });

  describe("updateProduct", () => {
    it("should return data products", () => {
      const mockUser = {
        id: 1,
      };
      const mockCategoryProduct = {
        id: 1,
      };

      const mockProduct = {
        id: 1,
        name: "Sepatu Futsal Putih",
        picture: "https://i.pravatar.cc/300",
        price: 1000,
        location: "Bandung",
        description: "Sepatu futsal putih, bahan berkualitas",
        id_category_product: mockCategoryProduct.id,
        id_user: mockUser.id,
      };

      const data = productServices.updateProduct(mockProduct.id, {
        name: "Sepatu Futsal Merah",
        picture: "https://i.pravatar.cc/300",
        price: 1000,
        location: "Bandung",
        description: "Sepatu futsal putih, bahan berkualitas",
        id_category_product: mockCategoryProduct.id,
        id_user: mockUser.id,
      });

      expect(data).toBeDefined();
    });
  });

  describe("deleteProduct", () => {
    it("should return data products", () => {
      mockProduct = {
        id: 1,
      };

      const data = productServices.deleteProduct(mockProduct.id);

      expect(data).toBeDefined();
    });
  });
});
