const categoryServices = require("../categoryService");

describe("categoryServices", () => {
  describe("findAll", () => {
    it("should return data category", async () => {
      const category = await categoryServices.findAll();

      expect(category).toBeDefined();
    });
  });

  describe("findById", () => {
    it("should return data category", async () => {
      const id = 1;

      const category = await categoryServices.findById(id);

      expect(category).toBeDefined();
    });

    it("should throw error categoryNotFound", async () => {
      const id = 100;

      try {
        await categoryServices.findById(id);
      } catch (error) {
        expect(error.name).toBe("categoryNotFound");
      }
    });
  });
});
