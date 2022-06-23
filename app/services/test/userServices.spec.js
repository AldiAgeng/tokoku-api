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
        password: "123456",
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
    try {
      it("should return data users", async () => {
        const data = {
          name: "Ujang",
          email: "ujang@gmail.com",
          password: await encryptPassword("123456"),
        };

        const user = await userServices.register(data);

        expect(user).toBeDefined();
      });

      it("should return error and message if email already exists", () => {
        const mockBody = {
          email: "aldiageng48@gmail.com",
          password: "123456",
        };

        const user = userServices.register(mockBody);

        expect(user).toBeDefined();

        expect(user).rejects.toThrowError({
          name: "badRequest",
          message: "Email already exists",
        });
      });

      it("should return error and message if field null ", () => {
        const mockBody = {
          name: "Aldi Ageng",
          email: "aldiageng48@gmail.com",
        };

        const user = userServices.register(mockBody);

        expect(user).toBeDefined();

        expect(user).rejects.toThrowError({
          name: "badRequest",
          message: "Please fill all required field",
        });
      });
    } catch (error) {
      expect(error).toBeDefined();
    }
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

      const user = userServices.login(mockBody);

      expect(user).rejects.toThrow({
        name: "wrongEmailPassword",
        message: "email or password are wrong",
      });
    });

    it("should return error if password not match", () => {
      const mockBody = {
        email: "aldiageng48@gmail.com",
        password: "1234567",
      };

      const user = userServices.login(mockBody);

      expect(user).rejects.toThrow({
        name: "wrongEmailPassword",
        message: "email or password are wrong",
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
