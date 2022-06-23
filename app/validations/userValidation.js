const { body } = require("express-validator");

module.exports = {
  registerDataValidate: [
    body("name", "Name is required").exists().not().isEmpty(),
    body("email", "Email is required").exists().not().isEmpty(),
    body("email", "Email is not valid").isEmail(),
    body("password", "Password is required").exists().not().isEmpty(),
  ],
  loginDataValidate: [body("email", "Email is required").exists().not().isEmpty(), body("email", "Email is not valid").isEmail(), body("password", "Password is required").exists().not().isEmpty()],
};
