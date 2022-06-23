const { User } = require("../models");

module.exports = {
  find(id) {
    return User.findByPk(id);
  },
  findByEmail(email) {
    return User.findOne({
      where: {
        email,
      },
    });
  },
  create(user) {
    return User.create(user);
  },
  update(id, user) {
    return User.update(user, {
      where: {
        id,
      },
    });
  },
};
