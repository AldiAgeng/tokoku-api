const notificationServices = require("../notificationServices");

const { sequelize } = require("../../models");

const { queryInterface } = sequelize;

afterAll(async () => {
  await queryInterface.bulkDelete("Notifications", null, {
    truncate: true,
    restartIdentity: true,
  });
});

describe("notificationServices", () => {
  describe("createNotification", () => {
    it("should return data notification", async () => {
      const id_order = 1;
      const data = {
        status: "bid",
      };

      const notification = await notificationServices.createNotification(id_order, data);

      expect(notification).toBeDefined();
    });

    it("shold return error", async () => {
      try {
        await notificationServices.createNotification();
      } catch (error) {
        expect(error).toHaveProperty("name");
        expect(error).toHaveProperty("message");
      }
    });
  });

  describe("findNotificationUser", () => {
    it("should return data notification", async () => {
      const user = {
        id: 1,
      };

      const buyer = await notificationServices.findNotificationUser(user);
      const seller = await notificationServices.findNotificationUser(user);

      expect(buyer).toBeDefined();
      expect(seller).toBeDefined();
    });

    it("should throw error", async () => {
      try {
        await notificationServices.findNotificationUser();
      } catch (error) {
        expect(error).toHaveProperty("name");
        expect(error).toHaveProperty("message");
      }
    });
  });

  describe("findOneNotification", () => {
    it("should return data notification", async () => {
      id = 1;

      const notification = await notificationServices.findOneNotification(id);

      expect(notification).toBeDefined();
    });

    it("should throw error notificationNotFound", async () => {
      const id = 1000;
      try {
        await notificationServices.findOneNotification(id);
      } catch (error) {
        expect(error).toHaveProperty("name");
        expect(error).toHaveProperty("message");
      }
    });
  });

  describe("updateNotification", () => {
    it("should return data notification", async () => {
      const id = 1;

      const notification = await notificationServices.updateNotification(id);

      expect(notification).toBeDefined();
    });

    it("should throw error notificationNotFound", async () => {
      try {
        await notificationServices.updateNotification(999);
      } catch (error) {
        expect(error).toHaveProperty("name");
        expect(error).toHaveProperty("message");
      }
    });
  });
});
