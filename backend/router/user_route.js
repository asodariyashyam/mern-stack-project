const express = require("express");
const router = express.Router();
const userController = require("../controllers/userctl");
const { verifyToken } = require("../utils/verifyToken");

router.post("/signup", userController.signup);
router.post("/signin", userController.signIn);
router.post("/google", userController.google);
router.get('/signout', userController.signOut)

router.put("/update/:id", verifyToken, userController.updateUser);

router.delete("/delete/:id", verifyToken, userController.deleteUser);
router.get("/listing/:id", verifyToken, userController.getUserListing);
router.get("get/:id", verifyToken, userController.getUser);

module.exports = router;
