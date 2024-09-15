require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");
const dbConnect = require("./config/db");
const authRouter = require("./routes/authRouter");
const homeRouter = require("./routes/homeRouter");
const passportInit = require("./config/passport");
const authMiddleware = require("./middlewares/authenticate");
const app = express();
dbConnect();
passportInit(passport);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Add static folder
app.use(express.static("public"));

//Set views
app.use(expressLayouts);
app.set("views", "./views");
app.set("layout", "layouts/main");
app.set("view engine", "ejs");

app.use("/", homeRouter);
app.use("/auth", authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
