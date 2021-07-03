const express = require("express");
const router = express.Router();
const SocialMedia = require("../models/socialmedia");

router.post("/add_social_media", async (req, res) => {
  const socialdetails = await SocialMedia.find();
  if (socialdetails.length > 0) {
    const Social = await SocialMedia.updateOne({
      facebook: req.body.facebook,
      linkedIn: req.body.linkedIn,
      twitter: req.body.twitter,
      instagram: req.body.instagram,
      youtube: req.body.youtube,
    });
    return res.status(200).send(Social);
  } else {
    const Social = new SocialMedia({
      facebook: req.body.facebook,
      linkedIn: req.body.linkedIn,
      twitter: req.body.twitter,
      instagram: req.body.instagram,
      youtube: req.body.youtube,
    });
    await Social.save()
    return res.status(200).send(Social);
  }
});

router.get("/fetch_socialmedia", async (req, res) => {
  try {
    const socialdetails = await SocialMedia.find();
    return res.status(200).send(socialdetails);
  } catch (err) {
    return res.json(400).send({ message: err.message });
  }
});
module.exports = router;
