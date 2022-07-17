const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "duvtiioze",
  api_key: "314254655121845",
  api_secret: "fF4E2wvgzQtV1tivQ8bOPWBUszo",
  secure: true,
});

module.exports = cloudinary;
