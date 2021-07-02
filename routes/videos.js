const express = require("express");
const mongoose=require("mongoose")
const cors = require("cors");
const path = require("path");
const router = express.Router();
const multer = require("multer");
const Video=require("../models/videos");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
cloudinary.config({
  cloud_name: 'db2ralofx',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET
})
let storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'cie-data',
    resource_type: 'auto',
    public_id: (req, file) => file.filename,
  }
})
let uploading = multer({ storage: storage });

router.post("/save", uploading.single("Video"), async (req, res) => {
    console.log("request received");
    console.log(req.body);
    console.log(req.file);
    const Data=new Video({
        title:req.body.title,
        Video:req.file.path
    })
    Data.save((err,data)=>{
        if(err)
        {
            return res.status(401).send({message:err});
        }
        else{
            return res.status(200).json(data);
        }
    })
}
);
router.get("/fetch", async (req, res) => {
  try {
    let fetchData = await Video.find();
    return res.status(200).send(fetchData);
  } catch (error) {
    res.status(404).json({ message: error.message });

  }
});
router.get("/fetch/:id", async (req, res) => {
    const { id } = req.params;
    try {
      let fetchData = await Video.findById(id);
      return res.status(200).send(fetchData);
    } catch (error) {
      res.status(404).json({ message: error.message });
  
    }
  });
  router.put(
    "/save/:id",
    uploading.single("Thumbnail"),
    async (req, res) => {
        console.log("request received");
        console.log(req.body);
        console.log(req.file);
      const { id } = req.params;
      const Data={
        title:req.body.title,
        Video:req.file.path
    }
  
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);
  
  
      await Video.findByIdAndUpdate(id, Data);
  
      res.json(data);
    }
  );
router.delete("/delete/:id", async (req, res) => {
    console.log("request received");
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);
  
    await Video.findByIdAndRemove(id);
  
    res.json({ message: "Post deleted successfully." });
  });
module.exports = router;
