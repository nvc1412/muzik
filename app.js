var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var methodOverride = require("method-override");
var session = require("express-session");

const moment = require("moment-timezone");

require("dotenv/config");
var app = express();

// Middleware để thiết lập múi giờ cho mỗi request
app.use((req, res, next) => {
  // Đặt múi giờ cho Việt Nam (Asia/Ho_Chi_Minh)
  moment.tz.setDefault("Asia/Ho_Chi_Minh");
  // Chuyển đổi đối tượng moment sang EJS local
  res.locals.moment = moment;
  next();
});

// view engine setup
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method", { methods: ["GET", "POST"] }));
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.get("/", (req, res, next) => {
  // res.render("index");
  res.redirect("/trangchu");
});

require("./routes/route")(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("Error");
});

module.exports = app;
