const router = require("express").Router();
const userCont = require("../controller/userController");
router.post("/create", userCont.createUser);
router.get("/all", userCont.getAllUser);
router.put("/update/:userId", userCont.updateUser);
router.delete("/delete/:userId", userCont.deleteUser);
module.exports = router;
