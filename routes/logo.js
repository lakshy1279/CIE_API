const express = require("express");
const cors = require("cors");
const path = require("path");
const router = express.Router();
const Logo = require("../models/logo");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
cloudinary.config({
  cloud_name: "db2ralofx",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
});
let storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "cie-data",
    resource_type: "auto",
    public_id: (req, file) => file.filename,
  },
});
let uploading = multer({ storage: storage });

router.post("/add_logo", uploading.fields([{ name: "frontendImage", maxCount: 1 }, { name: "backendImage", maxCount: 1 },]), async (req, res) => {
  let fetchData = await Logo.find();
  if (fetchData.length > 0) {
    try {
      if (req.files.frontendImage === undefined && req.files.backendImage !== undefined) {
        var data = await Logo.updateOne({
          frontendImage: fetchData[0].frontendImage,
          backendImage: req.files.backendImage[0].path,
        });
      } else if (req.files.backendImage === undefined && req.files.frontendImage !== undefined) {
        var data = await Logo.updateOne({
          frontendImage: req.files.frontendImage[0].path,
          backendImage: fetchData[0].backendImage,
        });
      } else {
        var data = await Logo.updateOne({
          frontendImage: req.files.frontendImage[0].path,
          backendImage: req.files.backendImage[0].path,
        });
      }
      console.log(data);
      return res.status(200).send(data);
    } catch (error) {
      res.status(404).json({ message: error.message });

    }
  } else {
    try {
      const data = new Logo({
        frontendImage: req.files.frontendImage[0].path,
        backendImage: req.files.backendImage[0].path,
      });
      await data.save();
      return res.status(200).send(data);
    } catch (error) {
      res.status(404).json({ message: error.message });

    }
  }
}
);
router.get("/fetch_logo", async (req, res) => {
  try {
    let fetchData = await Logo.find();
    return res.status(200).send(fetchData);
  } catch (error) {
    res.status(404).json({ message: error.message });

  }
});
module.exports = router;
