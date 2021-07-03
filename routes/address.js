const express = require("express");
const router = express.Router();
const Address = require("../models/address");

router.post("/add_address", async (req, res) => {
  let addressdetails = await Address.find();
  if (addressdetails.length > 0) {
    const Addressinfo = await Address.updateOne({
      name: req.body.name,
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
    });
    return res.status(200).send(Addressinfo);
  } else {
    const Addressinfo = new Address({
      name: req.body.name,
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
    });
    try {
      let data = await Addressinfo.save();
      return res.status(200).send(data);
    } catch (error) {
      return res.json(400).send({ message: err.message });
    }
  }

});

router.get("/fetch_address", async (req, res) => {
  // console.log("request received");
  try {
    let addressdetails = await Address.find();
    return res.status(200).send(addressdetails);
  } catch (err) {
    return res.json(400).send({ message: err.message });
  }
});
module.exports = router;
