const user = require("../../../models/user");
const userServices = require("../../../services/userServices");
module.exports = {
  async register(req, res) {
    try {
      const data = req;
      const user = await userServices.register(data);
      res.status(201).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  },

  async login(req, res) {
    try {
      const data = req;
      const user = await userServices.login(data);
      res.status(200).json({
        status: "success",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          token: user.token,
        },
      });
    } catch (error) {
      if (error.name === "wrongEmailPassword") {
        res.status(401).json({
          name: error.name,
          message: error.message,
        });
      } else {
        res.status(500).json({
          name: error.name,
          message: error.message,
        });
      }
    }
  },

  async getCurrentUser(req, res) {
    res.status(200).json({
      status: "success",
      data: req.user,
    })
  }
};
