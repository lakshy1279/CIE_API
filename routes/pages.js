const express = require("express");
const router = express.Router();
const PagesModel = require('../models/pages');

router.post("/add_page", async (req, res) => {
    console.log(req.body);
    const data = new PagesModel({
        title: req.body.title,
        menu: req.body.menu,
        submenu: req.body.submenu,
        description: req.body.description,
    });
    await data.save();
    return res.status(200).send(data);
});

router.get("/get_all_pages", async (req, res) => {
    try {
        const details = await PagesModel.find();
        return res.status(200).send(details);
    } catch (err) {
        return res.json(400).send({ message: err.message });
    }
});

router.get("/get_page_ById/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const Data = await PagesModel.findById(id);
        res.status(201).json(Data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
router.put("/edit_page/:id", async (req, res) => {
    const { id } = req.params;
    const { title, menu, submenu, description } = req.body;
    let data = { title, description, menu, submenu };
    let updatedData = await PagesModel.findByIdAndUpdate(id, data);
    res.json(updatedData);
});

router.delete("/delete_page/:id", async (req, res) => {
    const { id } = req.params;
    await PagesModel.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
});
module.exports = router;
