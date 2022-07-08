const fs = require("fs");
const path = require("path");

module.exports = {
  deletePictureUser: (file) => {
    fs.unlink(path.join(__dirname, "../../public") + "/uploads/users/" + file, (error) => {
      if (error) {
        console.log(error);
      }
      console.log("File deleted!");
    });
  },
  deletePictureProduct: (file) => {
    fs.unlink(path.join(__dirname, "../../public") + "/uploads/products/" + file, (error) => {
      if (error) {
        console.log(error);
      }
      console.log("File deleted!");
    });
  },
};
