const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
const cors = require("cors");
const postRoutes = require("./routes/index");
const homeRoutes = require("./routes/home");
const aboutRoutes = require("./routes/about");
const Post = require("./routes/post");
const Private = require("./routes/privatepages");
const Blog = require("./routes/blog");
const Auth = require("./routes/auth");
const upload = require("./routes/upload");
const path = require("path");
const social = require("./routes/social");
const address = require("./routes/address");
const logo = require("./routes/logo");
const compliance = require("./routes/compliance");
const pages = require("./routes/pages");
const photo = require("./routes/photos");
const video = require("./routes/videos");
const press = require("./routes/press");
const people = require("./routes/people");
const websites = require("./routes/website");
const notification=require("./routes/notification");
const expressSession = require("express-session");
const expressVisitorCounter = require("express-visitor-counter");
require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;

const db = require("./config/mongoose");
app.use(cors());
app.use(express.static(__dirname + "/public/"));
app.use(express.static(path.join(__dirname, "/public")));
app.use("/public", express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use("/file", upload);
app.use("/admin", postRoutes);
app.use("/private", Private);
app.use("/home", homeRoutes);
app.use("/about", aboutRoutes);
app.use("/blog", Blog);
app.use("/", Post);
app.use("/api", Auth);
app.use("/social", social);
app.use("/address", address);
app.use("/logo", logo);
app.use("/compliance", compliance);
app.use("/page", pages);
app.use("/photo", photo);
app.use("/video", video);
app.use("/press", press);
app.use("/people", people);
app.use("/websites", websites);
app.use("/notification",notification);

// console.log(db.collection('counters'));

(async () => {
  const dbConnection = await MongoClient.connect(process.env.MONGODB, {
    useUnifiedTopology: true,
  });
  const counters = dbConnection.db().collection("counters");
  app.enable("trust proxy");
  app.use(
    expressSession({ secret: "secret", resave: false, saveUninitialized: true })
  );
  app.use(expressVisitorCounter({ collection: counters }));
  app.get("/", async (req, res, next) => {
    let data = await counters.find().toArray();
    console.log(data);
    res.json(await counters.find().toArray());
  });
})();

app.listen(port, function (err) {
  if (err) {
    console.log(`error in running the server: ${err}`);
  }
  console.log(`server is running on the port:${port}`);
});
