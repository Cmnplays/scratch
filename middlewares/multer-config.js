const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    let uploadDir;
    if (file.fieldname === "productImage") {
      uploadDir = path.join(__dirname, "../public/images/productImages");
    } else if (file.fieldname === "profilePic") {
      uploadDir = path.join(__dirname, "../public/images/profilePictures");
    } else {
      uploadDir = path.join(__dirname, "../public/images/other");
    }

    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    const filename = Date.now() + path.extname(file.originalname);
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
});

module.exports = upload;
