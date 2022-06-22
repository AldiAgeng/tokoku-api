const userServices = require("../../../services/userServices");

module.exports = {
  async register(req, res) {
    try {
      const data = req.body;
      const user = await userServices.register(data);
      res.status(201).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      if (error.name === "badRequest") {
        res.status(400).json({
          name: error.name,
          message: error.message,
        });
      } else {
        res.status(500).json(error.message);
      }
    }
  },
};
