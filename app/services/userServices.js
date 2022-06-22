const userRepository = require("../repositories/userRepository");
const { encryptPassword, checkPassword, createToken } = require("../utils/authUtils");
module.exports = {
  async register(data) {
    try {
      if (!data.name || !data.email || !data.password) {
        throw {
          name: "badRequest",
          message: "Please fill all required field",
        };
      }

      const user = await userRepository.findByEmail(data.email);
      if (user) {
        throw {
          name: "badRequest",
          message: "Email already exists",
        };
      }

      const name = data.name;
      const email = data.email;
      const password = await encryptPassword(data.password);
      return userRepository.create({ name, email, password });
    } catch (error) {
      throw error;
    }
  },

  async login(data) {
    try {
      const email = data.email.toLowerCase();
      const password = data.password;

      const user = await userRepository.findByEmail(email);

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
};
