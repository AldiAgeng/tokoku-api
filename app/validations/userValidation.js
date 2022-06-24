const { body } = require("express-validator");
const userRepository = require("../repositories/userRepository");

module.exports = {
  registerDataValidate: [
    // name
    body("name", "Name is required").exists(),
    // email
    body("email", "Email is required").exists(),
    body("email", "Email is not valid").isEmail(),
    body("email", "Email is not valid").custom(async (value = null) => {
      const user = await userRepository.findByEmail(value);
      if (user) {
        throw new Error("Email already exists");
      }
    }),
    // password
    body("password").exists().withMessage("Password is required").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ],
  loginDataValidate: [body("email", "Email is required").exists(), body("email", "Email is not valid").isEmail(), body("password", "Password is required").exists()],
};
