const multer = require('multer');
const path = require('path');

// Configure where uploaded files will be saved
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, '../uploads/')); // make sure this folder exists!
  },
  filename: function (req, file, callback) {
    // unique filename to avoid overwriting
    callback(null, Date.now() + '-' + file.originalname);
  },
});


const upload = multer({
  storage
});

module.exports = upload;
