const { User } = require("../models");

module.exports = {
  async find(id) {
    return await User.findByPk(id);
  },
  async findByEmail(email) {
    return await User.findOne({
      where: {
        email,
      },
    });
  },
  async create(user) {
    return await User.create(user);
  },
  async update(id, user) {
    return await User.update(user, {
      where: {
        id,
      },
    });
  },
};
