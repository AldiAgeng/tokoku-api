const { Post } = require("../models");

module.exports = {
  create(createArgs) {
    return Post.create(createArgs);
  },

  update(id, updateArgs) {
    return Post.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  delete(id) {
    return Post.destroy(id);
  },

  find(id) {
    return Post.findByPk(id);
  },

  findAll() {
    return Post.findAll();
  },

  getTotalPost() {
    return Post.count();
  },
};
