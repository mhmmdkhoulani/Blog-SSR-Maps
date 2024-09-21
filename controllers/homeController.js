const Post = require("../models/postModel");
const { validationResult } = require("express-validator");
exports.home = async (req, res) => {
  const user = req.user;
  const posts = await Post.find().populate("user");
  posts.forEach((post) => {
    const date = post.createdAt;
    const month = date.toLocaleString("default", { month: "long" });
    const day = `0${date.getDate()}`.slice(-2);
    const year = date.getFullYear();
    post.createdAt = `${month} ${day}, ${year}`;
  });
  const fearturedPost = await Post.findOne({ isFeatured: true });
  const categories = [
    "News",
    "Technology",
    "Sports",
    "Business",
    "Games",
    "Test",
  ];

  const info = {
    title: "Home",
    description: "this page is home page",
  };

  res.render("index", {
    info,
    categories,
    posts,
    user,
    fearturedPost,
  });
};

exports.about = (req, res) => {
  const info = {
    title: "About",
    description: "this page is about page",
  };

  res.render("about", { info });
};

exports.addNewUserPage = (req, res) => {
  const errors = null;
  const formData = null;
  const info = {
    title: "Add New User",
    description: "this page is add new user page",
  };
  res.render("addUser", { info, errors, formData });
};

exports.addNewUser = async (req, res) => {
  const errors = validationResult(req);
  const info = {
    title: "Add New User",
    description: "this page is add new user page",
  };
  const formData = req.body;
  if (!errors.isEmpty()) {
    return res.render("addUser", { info, errors: errors.mapped(), formData });
  }

  res.redirect("/");
};
