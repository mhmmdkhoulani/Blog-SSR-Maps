const { Router } = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authenticate");
const router = Router();

router.get("/login", authMiddleware.loggedIn, authController.loginPage);
router.get("/register", authMiddleware.loggedIn, authController.registerPage);
router.post("/register", authController.register);
router.post(
  "/login",

  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    successRedirect: "/",
    failureFlash: true,
  })
);
router.get("/logout", authController.logout);
module.exports = router;
