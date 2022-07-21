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
    body("password").isStrongPassword().withMessage("Password must contain at least one number, one uppercase, one lowercase letter and one special character"),
  ],
  loginDataValidate: [body("email", "Email is required").exists(), body("email", "Email is not valid").isEmail(), body("password", "Password is required").exists()],

  updateDataValidate: [
    body("name", "Name is required").exists(),
    body("phone_number", "Phone number is required").exists(),
    body("phone_number", "Phone number is not valid").isNumeric(),
    body("phone_number", "Only Indonesia phone number is allowed").isMobilePhone("id-ID"),
    body("city", "City is required").exists(),
    body("address", "Address is required").exists(),
  ],
};
