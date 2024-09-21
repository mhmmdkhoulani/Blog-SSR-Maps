const { Router } = require("express");
const homeController = require("../controllers/homeController");
const authMiddleware = require("../middlewares/authenticate");
const { userValidations } = require("../validators/userValidator");
const { upload } = require("../middlewares/filesMiddleware");
const router = Router();

router.get("/", homeController.home);
router.get("/newUser", homeController.addNewUserPage);
router.post(
  "/newUser",
  upload.single("image"),
  userValidations,
  homeController.addNewUser
);

module.exports = router;
