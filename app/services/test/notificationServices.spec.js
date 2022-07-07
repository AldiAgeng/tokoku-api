const notificationServices = require("../notificationServices");

describe("notificationServices", () => {
  describe("createNotification", () => {
    it("should return data notification", async () => {
      const id_order = 1;

      const notification = await notificationServices.createNotification(id_order);

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

  describe("findNotificationSeller", () => {
    it("should return data notification", async () => {
      const user = {
        id: 1,
      };

      const notification = await notificationServices.findNotificationSeller(user);

      expect(notification).toBeDefined();
    });

    it("should throw error", async () => {
      try {
        await notificationServices.findNotificationSeller();
      } catch (error) {
        expect(error).toHaveProperty("name");
        expect(error).toHaveProperty("message");
      }
    });
  });

  describe("findNotificationBuyer", () => {
    it("should return data notification", async () => {
      const user = {
        id: 1,
      };

      const notification = await notificationServices.findNotificationBuyer(user);

      expect(notification).toBeDefined();
    });

    it("should throw error", async () => {
      try {
        await notificationServices.findNotificationBuyer();
      } catch (error) {
        expect(error).toHaveProperty("name");
        expect(error).toHaveProperty("message");
      }
    });
  });

  describe("findOneNotification", () => {
    it("should return data notification", async () => {
      const id = 1;

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
        expect(error.name).toBe("notificationNotFound");
      }
    });
  });
});
