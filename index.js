const express = require("express");
const mongoose = require("mongoose");
const User = require("./model/user");
const userRouter = require("./routes/userRoute");
const app = express();
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("this is working ");
});

app.use("/user", userRouter);

app.listen(4001, async () => {
  await mongoose.connect("mongodb://0.0.0.0:27017/crud");
  console.log("server is running at port 4001");
});

// mcv format
// m model
//  controller
//  v views/router
