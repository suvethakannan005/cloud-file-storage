const cloudinary = require("../config/cloud");
const File = require("../models/File");

exports.uploadFile = async (req, res) => {
  const files = req.files;
  let uploaded = [];

  for (let file of files) {
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      async (error, result) => {
        if (error) return res.status(500).json(error);

        const saved = await File.create({
          userId: req.user.id,
          fileName: file.originalname,
          fileUrl: result.secure_url
        });

        uploaded.push(saved);
        if (uploaded.length === files.length)
          res.json({ message: "Files uploaded", uploaded });
      }
    ).end(file.buffer);
  }
};

exports.deleteFile = async (req, res) => {
  await File.findByIdAndDelete(req.params.id);
  res.json({ message: "File deleted" });
};
const File = require("../models/File");

// GET all files of logged-in user
exports.getFiles = async (req, res) => {
  try {
    const files = await File.find({ userId: req.user.id });
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: "Error fetching files" });
  }
};
