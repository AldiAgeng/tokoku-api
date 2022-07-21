const { body } = require("express-validator");

module.exports = {
  orderDataValidate: [
    body("price", "Price is required").exists(),
    body("price", "Price is not valid").isNumeric(),
    body("status", "Status is required").exists(),
    body("status", "Status is not valid").isIn(["bid", "accepted", "rejected"]),
    body("id_product", "Product is required").exists(),
    body("id_product", "Product is not valid").isNumeric(),
  ],
};
