const express = require("express");
const router = express.Router();
const Compliance = require("../models/compliance");

router.post("/add_compliance", async (req, res) => {
  const data = new Compliance({
    title: req.body.title,
    description: req.body.description,
  });
  await data.save();
  return res.status(200).send(data);
});
router.get("/get_all_compliances", async (req, res) => {
  try {
    const details = await Compliance.find();
    return res.status(200).send(details);
  } catch (err) {
    return res.json(400).send({ message: err.message });
  }
});
router.get("/get_compliance_ById/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const Data = await Compliance.findById(id);
    res.status(201).json(Data);
  } catch (error) {
    res.status(404).json({ message: error.message });

  }
});
router.put("/edit_compliance/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  let data = { title, description };
  let updatedData = await Compliance.findByIdAndUpdate(id, data);
  res.json(updatedData);
});

router.delete("/delete_compliance/:id", async (req, res) => {
  const { id } = req.params;
  await Compliance.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
});

module.exports = router;
