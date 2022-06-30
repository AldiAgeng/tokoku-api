const { body } = require("express-validator");

module.exports = {
  orderDataValidate: [body("price").exists().isNumeric(), body("status").exists().isIn(["bid", "canceled", "accepted", "rejected"]), body("id_product").exists().isNumeric()],
};
