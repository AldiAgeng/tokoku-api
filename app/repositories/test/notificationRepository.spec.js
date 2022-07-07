const notificationRepository = require("../notificationRepository");

describe("notificationRepository", () => {
  describe("createNotification", () => {
    it("should created a notification", async () => {
      const data = 1;

      const notification = await notificationRepository.createNotification(data);

      expect(notification).toBeDefined();
    });
  });

  describe("findNotificationSeller", () => {
    it("should return a notification", async () => {
      const notification = await notificationRepository.findNotificationSeller(1);

      expect(notification).toBeDefined();
    });
  });

  describe("findNotificationBuyer", () => {
    it("should return a notification", async () => {
      const notification = await notificationRepository.findNotificationBuyer(1);

      expect(notification).toBeDefined();
    });
  });
  describe("findOneNotification", () => {
    it("should return a notification", async () => {
      const notification = await notificationRepository.findOneNotification(1);

      expect(notification).toBeDefined();
    });
  });
});
