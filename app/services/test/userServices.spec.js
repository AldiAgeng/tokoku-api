const userServices = require("../userServices");
const { sequelize } = require("../../models");

const { queryInterface } = sequelize;

beforeAll(async () => {
  await queryInterface.bulkInsert(
    "Users",
    [
      {
        name: "Aldi Ageng",
        email: "aldiageng48@gmail.com",
        password: "123456",
        picture: "https://i.pravatar.cc/300",
        phone_number: "081234567890",
        address: "Jl. Raya Bohongan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    restartIdentity: true,
  });
});

describe("userServices", () => {
  describe("register", () => {
    it("should return data users", () => {
      const mockBody = {
        email: "aldiageng48@gmail.com",
        password: "123456",
      };

      const user = userServices.register(mockBody);

      expect(user).toBeDefined();
    });

    it("should return error and message if email already exists", () => {
      const mockBody = {
        email: "aldiageng48@gmail.com",
        password: "123456",
      };

      const user = userServices.register(mockBody);

      expect(user).toBeDefined();

      expect(data).throw(Error("User with this email already exists"));
    });
  });

  describe("login", () => {
    it("should return data users", () => {
      const mockBody = {
        email: "aldiageng48@gmail.com",
        password: "123456",
      };

      const data = userServices.login(mockBody);

      expect(data).toBeDefined();
    });

    it("should return error if email not found", () => {
      const mockBody = {
        email: "hayuk@gmail.com",
        password: "123456",
      };

      const data = userServices.login(mockBody);

      expect(data).throw(Error("Invalid email or password"));
    });

    it("should return error if password not match", () => {
      const mockBody = {
        email: "aldiageng48@gmail.com",
        password: "1234567",
      };

      const data = userServices.login(mockBody);

      expect(data).throw(Error("Invalid email or password"));
    });
  });

  describe("changeProfile", () => {
    it("should return change data users", () => {
      const mockUser = {
        id: 1,
      };

      const mockBody = {
        name: "Aldi Ageng",
        picture: "https://i.pravatar.cc/300",
        phone: "081234567890",
        address: "Jl. Raya Bohongan",
      };

      const data = userServices.changeProfile(mockUser, mockBody);

      expect(data).toBeDefined();
    });
  });
});
