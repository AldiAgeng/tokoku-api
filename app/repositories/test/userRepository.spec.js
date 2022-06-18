const userRepository = require("../userRepository");

describe("userRepository", () => {
  describe("create", () => {
    it("should create a new user", async () => {
      const user = await userRepository.create({
        name: "Aldi Ageng",
        email: "aldiageng48@gmail.com",
        password: "123456",
        picture: "https://i.pravatar.cc/300",
        phone_number: "081234567890",
        address: "Jl. Raya Bohongan",
      });

      expect(user.name).toBe("Aldi Ageng");
      expect(user.email).toBe("aldiageng48@gmail.com");
      expect(user.password).toBe("123456");
      expect(user.picture).toBe("https://i.pravatar.cc/300");
      expect(user.phone_number).toBe("081234567890");
      expect(user.address).toBe("Jl. Raya Bohongan");
    });
  });

  describe("find", () => {
    it("should return a user by id", async () => {
      const user = await userRepository.find(1);

      expect(user.name).toBe("Aldi Ageng");
      expect(user.email).toBe("aldiageng48@gmail.com");
      expect(user.password).toBe("123456");
      expect(user.picture).toBe("https://i.pravatar.cc/300");
      expect(user.phone_number).toBe("081234567890");
      expect(user.address).toBe("Jl. Raya Bohongan");
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

  describe("findAll", () => {
    it("should return all user", async () => {
      const users = await userRepository.findAll();

      expect(users.length >= 0).toBe(true);
    });
  });

  describe("delete", () => {
    it("should delete a user", async () => {
      const user = await userRepository.delete(1);

      expect(user).toBe(1);
    });
  });
});
