const userServices = require("../userServices");
const { sequelize } = require("../../models");

const { queryInterface } = sequelize;

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    restartIdentity: true,
  });
});

describe("userServices", () => {
  describe("register", () => {
    it("should return data users", async () => {
      try {
        const mockData = {
          name: "Ujang",
          email: "ujang@gmail.com",
          password: "123456",
        };

        const result = await userServices.register(mockData);

        expect(result).toHaveProperty("id");
        expect(result).toHaveProperty("name");
        expect(result).toHaveProperty("email");
        expect(result).toHaveProperty("password");
      } catch (error) {
        throw error;
      }
    });

    it("should throw error", async () => {
      try {
        await userServices.register();

        expect(true).toBe(false);
      } catch (error) {
        expect(error).toHaveProperty("name");
        expect(error).toHaveProperty("message");
      }
    });
  });

  describe("login", () => {
    it("should return error wrongEmailPassword", async () => {
      try {
        const data = {
          email: "ujangx@gmail.com",
          password: "123456",
        };

        const result = await userServices.login(data);

        expect(result).toHaveProperty("name");
        expect(result).toHaveProperty("message");
      } catch (error) {
        expect(error).toHaveProperty("name");
        expect(error).toHaveProperty("message");
      }
    });

    it("should return error wrongEmailPassword", async () => {
      try {
        const data = {
          email: "ujang@gmail.com",
          password: "1234567",
        };

        const result = await userServices.login(data);

        expect(result).toHaveProperty("name");
        expect(result).toHaveProperty("message");
      } catch (error) {
        expect(error).toHaveProperty("name");
        expect(error).toHaveProperty("message");
      }
    });

    it("should return data user and token", async () => {
      try {
        const data = {
          email: "ujang@gmail.com",
          password: "123456",
        };

        const result = await userServices.login(data);

        expect(result).toHaveProperty("id");
        expect(result).toHaveProperty("name");
        expect(result).toHaveProperty("email");
        expect(result).toHaveProperty("token");
      } catch (error) {
        throw error;
      }
    });
  });

  describe("find", () => {
    it("should return data user", async () => {
      const id = 1;

      const user = await userServices.find(id);

      expect(user).toBeDefined();
    });
  });

  describe("update", () => {
    // it("should return data user", async () => {
    //   const id = 1;
    //   const user = {
    //     name: "Ujang",
    //     city: "Jakarta",
    //     address: "Jl. Raya",
    //     phone_number: "081234567890",
    //     picture: {
    //       name: "ujang.jpg",
    //       buffer: "",
    //       mimetype: ".jpg",
    //     },
    //   };

    //   const result = await userServices.update(id, user);

    //   expect(result).toBeDefined();
    // });

    it("should throw error userNotFound", async () => {
      try {
        const id = 1000;
        const user = {
          name: "Ujang",
          email: "ujang@gmail.com",
        };
        const url = "http://localhost:3000/upload/image.jpg";

        await userServices.update(id, user, url);

        expect(true).toBe(false);
      } catch (error) {
        expect(error).toHaveProperty("name");
        expect(error).toHaveProperty("message");
      }
    });

    it("should return error ", async () => {
      const id = 2;
      const user = {
        name: "Ujang",
        email: "ujangjangjang@gmail.com",
      };

      url = "http://localhost:3000/upload/image.jpg";

      try {
        const data = await userServices.update(user, url);

        expect(data).toBeDefined();
      } catch (error) {
        expect(error).toHaveProperty("name");
        expect(error).toHaveProperty("message");
      }
    });
  });
});
