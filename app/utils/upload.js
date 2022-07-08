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
  uploadUser: multer({
    storage: storageUser,
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
      }
    },
    limits: { fileSize: 1024 * 1024 * 2 },
  }),
  uploadProduct: multer({
    storage: storageProduct,
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
      }
    },
    limits: { fileSize: 1024 * 1024 * 2 },
  }),
};
