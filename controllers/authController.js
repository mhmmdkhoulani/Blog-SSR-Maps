const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.loginPage = (req, res) => {
  const info = {
    title: "Login",
    description: "this page is home page",
  };
  res.render("login", { info });
};
exports.registerPage = (req, res) => {
  const info = {
    title: "Sign up",
    description: "this page is home page",
  };
  res.render("register", { info });
};
exports.register = async (req, res) => {
  const body = req.body;
  try {
    if (body.password !== body.confirmPassword) {
      req.flash("error", "Passwords do not match");
      return res.redirect("/auth/register");
    }
    const hashedPassword = await bcrypt.hash(body.password, 12);
    console.log(hashedPassword);
    body.password = hashedPassword;
    const user = await User.create(body);
    res.redirect("/auth/login");
  } catch (error) {
    res.status(500).send({ status: "fail", message: error.message });
  }
};

exports.logout = async (req, res) => {
  req.logOut((error) => {
    console.log(error);
  });
  res.redirect("/");
};
