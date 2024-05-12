const express = require('express');
const cors = require('cors');
const multer = require('multer');
const router = express.Router();

router.use(cors());
router.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './public/Docs');
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    console.log('File uploaded successfully');
    res.status(200).send('success');
  } else {
    console.log('Failed to upload file');
    res.status(500).send('error');
  }
});

module.exports = router;

