const { validationResult } = require("express-validator");

module.exports = {
  async checkValidate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        name: "badRequest",
        message: errors.array(),
      });
    }
    next();
  },
};
