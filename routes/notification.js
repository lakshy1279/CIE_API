const express = require("express");
const mongoose=require("mongoose")
const cors = require("cors");
const path = require("path");
const router = express.Router();
const multer = require("multer");
const Notification=require("../models/notifications");
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

router.post("/save", async (req, res) => {
    console.log("request received");
    console.log(req.body);
    const Data=new Notification({
        title:req.body.title,
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
    let fetchData = await Notification.find();
    return res.status(200).send(fetchData);
  } catch (error) {
    res.status(404).json({ message: error.message });

  }
});
router.get("/fetch/:id", async (req, res) => {
    const { id } = req.params;
    try {
      let fetchData = await Notification.findById(id);
      return res.status(200).send(fetchData);
    } catch (error) {
      res.status(404).json({ message: error.message });
  
    }
  });
  router.put(
    "/save/:id",
    async (req, res) => {
      const { id } = req.params;
      const Data={
        title:req.body.title,
        description:req.body.description
    }
  
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);
  
  
      await Notification.findByIdAndUpdate(id, Data);
  
      res.json(Data);
    }
  );
router.delete("/delete/:id", async (req, res) => {
    console.log("request received");
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);
  
    await Notification.findByIdAndRemove(id);
  
    res.json({ message: "Post deleted successfully." });
  });
module.exports = router;
