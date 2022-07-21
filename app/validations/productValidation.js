const { body } = require("express-validator");

module.exports = {
  productDataValidate: [
    body("name", "Name is required").exists(),
    // body("picture", "Picture is required").exists(),
    body("price", "Price is required").exists(),
    body("price", "Price is not valid").isNumeric(),
    body("location", "Location is required").exists(),
    body("description", "Description is required").exists(),
    body("status", "Status is required").exists(),
    body("status", "Status is not valid").isIn(["available", "sold"]),
    body("id_category_product", "Category is required").exists(),
    body("id_category_product", "Category is not valid").isNumeric(),
  ],
};
