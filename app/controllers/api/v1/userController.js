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
      if (error.name === "badRequest" || error.name === "SequelizeValidationError") {
        res.status(400).json({
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

  async login(req, res) {
    try {
      const data = req.body;
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
      if (error.name === "badRequest") {
        res.status(400).json({
          name: error.name,
          message: error.message,
        });
      } else if (error.name === "wrongEmailPassword") {
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
    });
  },

  async update(req, res) {
    try {
      if (req.file) {
        const data = req.body;
        data.picture = req.file;
        await userServices.update(req.user.id, data);
        res.status(200).json({
          status: "success",
          message: "user updated successfully",
        });
      } else {
        await userServices.update(req.user.id, req.body);
        res.status(200).json({
          status: "success",
          message: "user updated successfully",
        });
      }
    } catch (error) {
      if (error.name === "usertNotFound") {
        res.status(404).json({
          name: error.name,
          message: error.message,
        });
      } else if (error.name === "badRequest" || error.name === "SequelizeValidationError") {
        res.status(400).json({
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
  async changePassword(req, res) {
    try {
      const data = req.body;
      await userServices.changePassword(req.user.id, data);
      res.status(200).json({
        status: "success",
        message: "password changed successfully",
      });
    } catch (error) {
      if (error.name === "badRequest" || error.name === "SequelizeValidationError") {
        res.status(400).json({
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
};
