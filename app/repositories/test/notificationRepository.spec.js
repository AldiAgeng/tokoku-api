const notificationRepository = require("../notificationRepository");

describe("notificationRepository", () => {
  describe("createNotification", () => {
    it("should created a notification", () => {
      id_order = 1;
      status = "bid";

      const notification = notificationRepository.createNotification(id_order, status);

      expect(notification).toBeDefined();
    });
  });

  describe("findNotificationSeller", () => {
    it("should return a notification", () => {
      const user = {
        id: 1,
      };
      const notification = notificationRepository.findNotificationSeller(user);

      expect(notification).toBeDefined();
    });
  });

  describe("findNotificationBuyer", () => {
    it("should return a notification", () => {
      const user = {
        id: 1,
      };
      const notification = notificationRepository.findNotificationBuyer(user);

      expect(notification).toBeDefined();
    });
  });

  describe("findOneNotification", () => {
    it("should return a notification", async () => {
      const id = 1;
      const notification = await notificationRepository.findOneNotification(id);

      expect(notification).toBeDefined();
    });
  });
});
