const multer = require("multer");

// memoryStorage puts the file on req.file.buffer so it can go straight into
// MongoDB as a Blob — no temp folder to clean up.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") return cb(null, true);
    cb(new Error("Only PDF files are allowed"));
  },
});

module.exports = upload.single("linkedFile");