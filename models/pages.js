const mongoose = require("mongoose");

const PagesSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        menu: {
            type: String,
        },
        submenu: {
            type: String,
        },
        description: {
            type: String,
        },
    },
    { timestamps: true }
);

const Pages = mongoose.model("Pages", PagesSchema);

module.exports = Pages;
