const userRepository = require("../repositories/userRepository");
const { encryptPassword, checkPassword, createToken } = require("../utils/authUtils");
const { validationResult } = require("express-validator");

module.exports = {
  async register(data) {
    try {
      const name = data.body.name;
      const email = data.body.email;

      if (!data.body.name && !data.body.email && !data.body.password) {
        throw {
          name: "badRequest",
          message: "Please fill all required field",
        };
      }

      const user = await userRepository.findByEmail(data.body.email);
      if (user) {
        throw {
          name: "badRequest",
          message: "Email already exists",
        };
      }

      const errors = validationResult(data);
      if (!errors.isEmpty()) {
        throw {
          name: "badRequest",
          message: errors.array()[0].msg,
        };
      }

      const password = await encryptPassword(data.body.password);
      return userRepository.create({ name, email, password });
    } catch (error) {
      throw error;
    }
  },

  async login(data) {
    try {
      const email = data.body.email;
      const password = data.body.password;

      if (!data.body.email && !data.body.password) {
        throw {
          name: "badRequest",
          message: "Please fill all required field",
        };
      }

      const errors = validationResult(data);
      if (!errors.isEmpty()) {
        throw {
          name: "badRequest",
          message: errors.array()[0].msg,
        };
      }

      const user = await userRepository.findByEmail(email.toLowerCase());
      if (!user) {
        throw {
          name: "wrongEmailPassword",
          message: "email or password are wrong",
        };
      }

      const isPasswordCorrect = await checkPassword(user.password, password);

      if (!isPasswordCorrect) {
        throw {
          name: "wrongEmailPassword",
          message: "email or password are wrong",
        };
      }

      const token = createToken({
        id: user.id,
        name: user.name,
        email: user.email,
      });

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        token,
      };
    } catch (error) {
      throw error;
    }
  },
  find(id) {
    return userRepository.find(id);
  },
};
