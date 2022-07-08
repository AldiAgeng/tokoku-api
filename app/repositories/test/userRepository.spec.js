const userRepository = require("../userRepository");
const { encryptPassword } = require("../../utils/authUtils");

describe("userRepository", () => {
  describe("find", () => {
    it("should return a user by id", async () => {
      const user = await userRepository.find(1);

      expect(user).toBeDefined();
    });
  });

  describe("findByEmail", () => {
    it("should return a user by email", async () => {
      data = {
        email: "ujang@gmail.com",
      };
      const user = await userRepository.findByEmail(data.email);

      expect(user).toBeDefined();
    });
  });

  describe("create", () => {
    it("should return data users", async () => {
      const mockBody = {
        name: "Budi",
        email: "budi@gmail.com",
        password: await encryptPassword("123456"),
      };

      const user = userRepository.create(mockBody);

      expect(user).toBeDefined();
    });
  });

  describe("update", () => {
    it("should update a user", async () => {
      const mockBody = {
        name: "Budi",
        phone_number: "081234567890",
        address: "Jl. Boongan",
      };

      const user = await userRepository.update(1, mockBody, "picture");

      expect(user.length).toBe(1);
      expect(user).toBeDefined();
    });
  });
});
