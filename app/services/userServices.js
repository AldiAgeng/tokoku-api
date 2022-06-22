const userRepository = require("../repositories/userRepository");
const { encryptPassword } = require("../utils/authUtils");
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
};
