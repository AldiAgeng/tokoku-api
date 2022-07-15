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
  update(id, user, url) {
    return User.update(
      {
        name: user.name,
        phone_number: user.phone_number,
        city: user.city,
        address: user.address,
        picture: url,
      },
      {
        where: {
          id,
        },
      }
    );
  },
};
