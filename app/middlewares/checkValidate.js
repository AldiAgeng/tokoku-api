const { validationResult } = require("express-validator");

module.exports = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      name: "badRequest",
      message: errors.array().map((error) => error.msg),
    });
  }
  next();
};
