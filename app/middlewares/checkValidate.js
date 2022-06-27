const { validationResult } = require("express-validator");

module.exports = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      name: "badRequest",
      message: "please fill all required fields and make sure the data is valid",
    });
  }
  next();
};
