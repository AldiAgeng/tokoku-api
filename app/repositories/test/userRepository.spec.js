const userRepository = require("../userRepository");

describe("userRepository", () => {
  describe("create", () => {
    it("should return data users", () => {
      const mockBody = {
        name: "Aldi Ageng",
        email: "aldiageng48@gmail.com",
        password: "123456",
      };

      const user = userRepository.create(mockBody);

      expect(user).toBeDefined();
    });
  });

  describe("find", () => {
    it("should return a user by id", async () => {
      const user = await userRepository.find(1);

      expect(user.name).toBe("Aldi Ageng");
      expect(user.email).toBe("aldiageng48@gmail.com");
      expect(user.password).toBe("123456");
    });
  });

  describe("update", () => {
    it("should update a user", async () => {
      const user = await userRepository.update(1, {
        name: "Aldi Ageng",
        email: "aldiageng48@gmail.com",
        password: "123456",
        picture: "https://i.pravatar.cc/300",
        phone_number: "081234567890",
        address: "Jl. Raya Bohongan",
      });

      expect(user.length).toBe(1);
    });
  });
});
