const userServices = require("../userServices");
const { encryptPassword, createToken } = require("../../utils/authUtils");
const { sequelize } = require("../../models");

const { queryInterface } = sequelize;

beforeAll(async () => {
  await queryInterface.bulkInsert(
    "Users",
    [
      {
        name: "Aldi Ageng",
        email: "aldiageng48@gmail.com",
        password: await encryptPassword("123456"),
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
    it("should return data users", async () => {
      const data = {
        name: "Ujang",
        email: "ujang@gmail.com",
        password: await encryptPassword("123456"),
      };

      const user = await userServices.register({
        body: data,
      });

      expect(user).toBeDefined();
    });

    it("should return error and message if email already exists", async () => {
      const mockBody = {
        email: "aldiageng48@gmail.com",
        password: "123456",
      };

      const user = await userServices.register({
        body: mockBody,
      });

      expect(user).toBeDefined();

      expect(user.name).toBe("badRequest");
      expect(user.message).toBe("Email already exists");
    });

    it("should return error and message if field null ", async () => {
      const mockBody = {
        name: "Aldi Ageng",
        email: "aldiageng48@gmail.com",
      };

      const user = await userServices.register({
        body: mockBody,
      });

      expect(user).toBeDefined();
    });
  });

  describe("login", () => {
    it("should return data users", async () => {
      const mockBody = {
        email: "aldiageng48@gmail.com",
        password: "123456",
      };

      const data = await userServices.login({
        body: mockBody,
      });

      expect(data).toBeDefined();
    });

    it("should return error if email not found", async () => {
      const mockBody = {
        email: "hayuk@gmail.com",
        password: "123456",
      };

      const user = await userServices.login({
        body: mockBody,
      });
    });

    it("should return error if password not match", async () => {
      const mockBody = {
        email: "aldiageng48@gmail.com",
        password: "1234567",
      };

      const user = await userServices.login({
        body: mockBody,
      });
    });
  });

  // describe("changeProfile", () => {
  //   it("should return change data users", () => {
  //     const mockUser = {
  //       id: 1,
  //     };

  //     const mockBody = {
  //       name: "Aldi Ageng",
  //       picture: "https://i.pravatar.cc/300",
  //       phone: "081234567890",
  //       address: "Jl. Raya Bohongan",
  //     };

  //     const data = userServices.changeProfile(mockUser, mockBody);

  //     expect(data).toBeDefined();
  //   });
  // });
});
