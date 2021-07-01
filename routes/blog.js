const express = require("express");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const Blog1 = require("../models/blog1");
const BlogCategory = require("../models/blogcategories");
const cors = require("cors");
const path = require("path");
const router = express.Router();

const multer = require("multer");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const Event = require("../models/event");
const EventCat = require("../models/eventCat");
const EventType = require("../models/eventType");
require('dotenv').config();

cloudinary.config({
  cloud_name: 'db2ralofx',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET
})
// var uploadimg = multer({
//   storage: multer.diskStorage({
//     destination: "./public/img/",

//     filename: function (req, file, cb) {
//       cb(
//         null,
//         file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//       );
//     },
//   }),

//   fileFilter: function (req, file, callback) {
//     var ext = path.extname(file.originalname);
//     if (ext !== ".png" && ext !== ".svg" && ext !== ".jpg" && ext !== ".jpeg") {
//       return callback("Only images are are allowed", null, false);
//     }
//     callback(null, true);
//   },
// });

let storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'cie-data',
    resource_type: 'auto',
    public_id: (req, file) => file.filename,
  }
})

let uploadimg = multer({ storage: storage });



router.post("/AddBlog", (req, res) => {
  const blogdata = new Blog({
    url: req.body.url,
  });

  console.log(req.body);

  blogdata.save(function (err, vid) {
    if (err) {
      res.send(err);
    } else {
      res.status(201).send(vid);
    }
  });
});


router.get("/update_blog/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const blogdata = await Blog.findById(id);

    res.status(200).json(blogdata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.put("/update_blog_patch/:id", async (req, res) => {
  const { id } = req.params;
  const { url } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updateblog = { url, _id: id };

  await Blog.findByIdAndUpdate(id, updateblog);

  res.json(updateblog);
});

///  Blog 1

// router.post("/AddBlog1", (req, res) => {
//   const blog1data = new Blog1({
//     title: req.body.title,
//     category: req.body.category,
//     description: req.body.description,
//   });

//   console.log(req.body);

//   blog1data.save(function (err, vid) {
//     if (err) {
//       res.send(err);
//     } else {
//       res.status(201).send(vid);
//     }
//   });
// });

//api for events

router.post("/AddEvent", uploadimg.single("file"), (req, res) => {
  const Eventdata = new Event({
    title: req.body.title,
    category: req.body.category,
    type: req.body.type,
    image: req.file.path,
    description: req.body.description,
    date: req.body.date,
  });

  console.log(req.file);

  Eventdata.save(function (err, vid) {
    if (err) {
      res.send(err);
    } else {
      res.status(201).send(vid);
    }
  });
});
router.get("/get_all_events", async (req, res) => {
  try {
    const Eventdata = await Event.find();
    res.status(201).json(Eventdata);

  } catch (error) {
    res.status(404).json({ message: error.message });

  }

});
router.get("/get_event_ById/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const eventData = await Event.findById(id);
    res.status(201).json(eventData);
  } catch (error) {
    res.status(404).json({ message: error.message });

  }

});
router.put(
  "/update_event/:id",
  uploadimg.single("file"),
  async (req, res) => {
    const { id } = req.params;
    const { title, category, type, file, description, date } = req.body;
    if (file) {
      image = file;
    } else {
      image = req.file.path;
    }

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    const updatehome2 = { title, category, type, description, image, date, _id: id };

    await Event.findByIdAndUpdate(id, updatehome2);

    res.json(updatehome2);
  }
);
router.delete("/delete_event/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Event.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
});



router.post("/add_event_cat", (req, res) => {
  const eventcatData = new EventCat({
    event_category: req.body.event_category,
  });

  console.log(req.body);

  eventcatData.save(function (err, vid) {
    if (err) {
      res.send(err);
    } else {
      res.status(201).send(vid);
    }
  });
});
router.get("/get_event_cat", async (req, res) => {
  try {
    const eventcatData = await EventCat.find();
    res.status(201).json(eventcatData);
  } catch (error) {
    res.status(404).json({ message: error.message });

  }
});
router.get("/get_event_catById/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const eventcatData = await EventCat.findById(id);
    res.status(201).json(eventcatData);
  } catch (error) {
    res.status(404).json({ message: error.message });

  }
});

router.put(
  "/update_event_cat/:id",
  async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    let updatedData = await EventCat.findByIdAndUpdate(id, { event_category: req.body.event_category });

    res.json(updatedData);
  }
);
router.delete("/delete_cat/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await EventCat.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
});



router.post("/add_event_type", (req, res) => {
  const eventtypeData = new EventType({
    event_type: req.body.event_type,
  });

  console.log(req.body);

  eventtypeData.save(function (err, vid) {
    if (err) {
      res.send(err);
    } else {
      res.status(201).send(vid);
    }
  });
});
router.get("/get_event_type", async (req, res) => {
  try {
    const eventtypeData = await EventType.find();
    res.status(201).json(eventtypeData);
  } catch (error) {
    res.status(404).json({ message: error.message });

  }
});
router.get("/get_event_typeById/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const eventtypeData = await EventType.findById(id);
    res.status(201).json(eventtypeData);
  } catch (error) {
    res.status(404).json({ message: error.message });

  }
});

router.put(
  "/update_event_type/:id",
  async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    let updatedData = await EventType.findByIdAndUpdate(id, { event_type: req.body.event_type });

    res.json(updatedData);
  }
);
router.delete("/delete_type/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await EventType.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
});


//articles
router.post("/AddBlog1", uploadimg.single("file"), (req, res) => {
  const blog1data = new Blog1({
    title: req.body.title,
    category: req.body.category,
    image: req.file.path,
    description: req.body.description,
    date: req.body.date,
  });

  console.log(req.file);

  blog1data.save(function (err, vid) {
    if (err) {
      res.send(err);
    } else {
      res.status(201).send(vid);
    }
  });
});
router.get("/Blog1s", async (req, res) => {
  try {
    const blog1data = await Blog1.find();

    res.status(200).json(blog1data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/update_blog1/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const blog1data = await Blog1.findById(id);

    res.status(200).json(blog1data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
// router.put("/update_blog1_patch/:id", async (req, res) => {
//   const { id } = req.params;
//   const { title, category, description } = req.body;

//   if (!mongoose.Types.ObjectId.isValid(id))
//     return res.status(404).send(`No post with id: ${id}`);

//   const updateblog1 = { title, category, description, _id: id };

//   await Blog1.findByIdAndUpdate(id, updateblog1);

//   res.json(updateblog1);
// });

router.put(
  "/update_blog1_patch/:id",
  uploadimg.single("file"),
  async (req, res) => {
    const { id } = req.params;
    const { title, category, file, description, date } = req.body;
    if (file) {
      image = file;
    } else {
      image = req.file.path;
    }

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    const updatehome2 = { title, category, description, image, date, _id: id };

    await Blog1.findByIdAndUpdate(id, updatehome2);

    res.json(updatehome2);
  }
);

router.delete("/delete_blog1/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Blog1.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
});

router.get("/getblogseperatevalue/:category", cors(), async (req, res) => {
  var category = req.params;
  try {
    const submenu1 = await Blog1.findOne(category);

    res.status(200).json(submenu1);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/blogwithcategory/:query", cors(), (req, res) => {
  var query = req.params.query;

  Blog1.find(
    {
      category: query,
    },
    (err, result) => {
      if (err) throw err;
      if (result) {
        res.json(result);
      } else {
        res.send(
          JSON.stringify({
            error: "Error",
          })
        );
      }
    }
  );
});

router.get("/blogvalues/:query", cors(), (req, res) => {
  var query = req.params.query;

  Blog1.find(
    {
      category: query,
    },
    (err, result) => {
      if (err) throw err;
      if (result) {
        res.json(result);
      } else {
        res.send(
          JSON.stringify({
            error: "Error",
          })
        );
      }
    }
  );
});

////Blog categories

router.post("/AddBlogCategory", (req, res) => {
  const blog1data = new BlogCategory({
    category: req.body.category,
  });

  console.log(req.body);

  blog1data.save(function (err, vid) {
    if (err) {
      res.send(err);
    } else {
      res.status(201).send(vid);
    }
  });
});

router.get("/BlogCategorys", async (req, res) => {
  try {
    const blogcategorydata = await BlogCategory.find();

    res.status(200).json(blogcategorydata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/update_blogcategory/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const blogcategorydata = await BlogCategory.findById(id);

    res.status(200).json(blogcategorydata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.put("/update_blogcategory_patch/:id", async (req, res) => {
  const { id } = req.params;
  const { category } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updateblogcategory = { category, _id: id };

  await BlogCategory.findByIdAndUpdate(id, updateblogcategory);

  res.json(updateblogcategory);
});

router.delete("/delete_blogcategory/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await BlogCategory.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
});

module.exports = router;
