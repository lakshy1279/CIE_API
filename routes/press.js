const express = require("express");
const mongoose=require("mongoose")
const cors = require("cors");
const path = require("path");
const router = express.Router();
const multer = require("multer");
const Press=require("../models/press");
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

router.post("/save", uploading.single("Thumbnail"), async (req, res) => {
    console.log("request received");
    console.log(req.body);
    console.log(req.file);
    const Data=new Press({
        title:req.body.title,
        Image:req.file.path,
        description:req.body.description,
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
    let fetchData = await Press.find();
    return res.status(200).send(fetchData);
  } catch (error) {
    res.status(404).json({ message: error.message });

  }
});
router.get("/fetch/:id", async (req, res) => {
    const { id } = req.params;
    try {
      let fetchData = await Press.findById(id);
      return res.status(200).send(fetchData);
    } catch (error) {
      res.status(404).json({ message: error.message });
  
    }
  });
  router.put(
    "/save/:id",
    uploading.single("Thumbnail"),
    async (req, res) => {
      const { id } = req.params;
      const Data={
        title:req.body.title,
        Image:req.file.path
    }
  
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);
  
  
      await Press.findByIdAndUpdate(id, Data);
  
      res.json(data);
    }
  );
router.delete("/delete/:id", async (req, res) => {
    console.log("request received");
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);
  
    await Press.findByIdAndRemove(id);
  
    res.json({ message: "Post deleted successfully." });
  });
module.exports = router;
