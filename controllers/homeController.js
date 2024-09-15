exports.home = (req, res) => {
  const user = req.user;
  res.render("index", { user });
};
