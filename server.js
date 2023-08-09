const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log("file", file.originalname);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

app.use(express.json());

app.use(multer({ storage }).single("image"));
app.use(express.static(path.join("uploads")));
let fp = null;
const contact = [];
app.post("/uploads", async (req, res) => {
  console.log(req.file);
  if (req.file) {
    fp = req.file.filename;
  }
  console.log("file", req.file);
  res.status(200).json({ previewUrl: "http://localhost:4000/" + fp });
});

app.post("/contact", async (req, res) => {
  //   console.log("fp", fp);
  const body = req.body;
  console.log(body);
  const newCon = {
    name: req.body.name,
    phone: req.body.phone,
    profile: req.body.profile,
  };
  contact.push(newCon);
  res.status(201).json(newCon);
});

app.get("/get/contact", async (req, res) => {
  console.log("get contacts===>", contact);
  res.status(200).json(contact);
});

app.put("/update/contact/:contactPhone", async (req, res) => {
  const phone = req.params.contactPhone;
  const cIndex = contact.findIndex((con) => con.phone == phone);
  const prevCon = contact[cIndex];
  const updatedContact = {
    name: req.body.name || prevCon.name,
    phone: req.body.phone || prevCon.phone,
    profile: req.body.profile || prevCon.profile,
  };
  contact.splice(cIndex, 1, updatedContact);
  res.status(200).json({ message: "updated contact", response: contact });
});

app.delete("/delete/contact/:contactPhone", async (req, res) => {
  const phone = req.params.contactPhone;
  const cIndex = contact.findIndex((con) => con.phone == phone);
  contact.splice(cIndex, 1);
  res.status(200).json({ message: "deleted contact", response: contact });
});

app.get("/home", async (req, res) => {
  console.log("this is test route");
});

app.listen(4000, () => {
  console.log("server is up and running at port 3000");
});
