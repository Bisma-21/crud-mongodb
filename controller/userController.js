const User = require("../model/user");

exports.createUser = async (req, res) => {
  try {
    console.log("hjhjhjh");
    const body = {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    };
    console.log("body===>", body);
    const createUser = await User.create(body);
    res.status(200).json({
      message: "user created successfully",
      response: createUser,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllUser = async (req, res) => {
  try {
    console.log("hjhjhjh");
    const getAllUsers = await User.find();
    const countUser = await User.count();
    res.status(200).json({
      message: "all users",
      response: { getAllUsers, countUser },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const checkUser = await User.find({ _id: userId });
    if (!checkUser) {
      return res.status(400).json({
        message: "user not found!.",
      });
    }
    console.log("check user", checkUser);
    const body = {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    };
    console.log("bosy==>", body);
    const t = await User.updateOne(
      { _id: userId },
      { name: body.name, email: body.email, age: body.age }
    );
    console.log("ttttt", t);
    const updatedUser = await User.find({ _id: userId });
    res.status(200).json({
      message: "updated user",
      response: updatedUser,
    });
    console.log("updated user==>", updatedUser);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const checkUser = await User.find({ _id: userId });
    if (!checkUser) {
      return res.status(400).json({
        message: "user not found",
      });
    }
    await User.deleteOne({ _id: userId });
    const deletedUser = await User.find({ _id: userId });
    res.status(200).json({
      message: "deleted user",
      response: deletedUser,
    });
  } catch (error) {
    console.log(error);
  }
};
