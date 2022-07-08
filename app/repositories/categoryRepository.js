const { CategoryProduct } = require("../models");

module.exports = {
    getAllCategory() {
        return CategoryProduct.findAll();
    },
    find(id) {
        return CategoryProduct.findByPk(id);
    },
};