const categoryRepository = require("../categoryRepository");

describe("categoryRepository", () => {
  describe("getAllCategory", () => {
    it("should return all categories", async () => {
      const categories = await categoryRepository.getAllCategory();

      expect(categories.length >= 0).toBe(true);
      expect(categories).toBeDefined();
    });
  });
  describe("find", () => {
    it("should return a category by id", async () => {
      const category = await categoryRepository.find(1);

      expect(category).toBeDefined();
    });
  });
});
