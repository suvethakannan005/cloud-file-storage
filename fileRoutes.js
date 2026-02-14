const express = require("express");
const router = express.Router();
const auth = require("../middleware/authmiddleware");
const upload = require("../middleware/uploadmiddleware");
const { uploadFile, deleteFile } = require("../controllers/filecontroller");

router.post("/upload", auth, upload.array("files", 5), uploadFile);
router.delete("/:id", auth, deleteFile);

module.exports = router;
const { uploadFile, deleteFile, getFiles } = require("../controllers/filecontroller");

// Get uploaded files
router.get("/", auth, getFiles);
