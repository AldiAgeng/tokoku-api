const multer = require("multer");
const path = require("path");

// Menentukan tempat penyimpanan file
const publicDirectory = path.join(__dirname, "../../public");
const uploadDirectory = path.join(publicDirectory, "uploads");

const userDirectory = path.join(uploadDirectory, "users");
const productDirectory = path.join(uploadDirectory, "products");

// Mendefinisikan gimana cara nyimpen file-nya
const storageUser = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, userDirectory);
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const storageProduct = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, productDirectory);
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

// Membuat upload middleware
module.exports = {
  uploadUser: multer({ storage: storageUser }),
  uploadProduct: multer({ storage: storageProduct }),
};
