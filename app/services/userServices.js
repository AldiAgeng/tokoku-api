const userRepository = require("../repositories/userRepository");
const { encryptPassword, checkPassword, createToken } = require("../utils/authUtils");

module.exports = {
  async register(data) {
    try {
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
      const email = data.email;
      const password = data.password;

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
  async update(id, user, url) {
    try {
      const userData = await userRepository.find(id);
      if (!userData) {
        throw {
          name: "userNotFound",
          message: "User is not found",
        };
      }
      return userRepository.update(id, user, url);
    } catch (error) {
      throw error;
    }
  },
};
