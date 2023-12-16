const dangnhap = require("../controllers/auth/DangNhap.controller");
const dangky = require("../controllers/auth/DangKy.controller");
const authMiddleware = require("../middlewares/auth.middleware");

module.exports = (app) => {
  var router = require("express").Router();

  router
    .get("/dangnhap", authMiddleware.isAuth, dangnhap.showDangNhap)
    .post("/dangnhap", dangnhap.dangnhap)

    .get("/dangky", authMiddleware.isAuth, dangky.showDangKy)
    .post("/dangky", dangky.dangky)

    .get("/dangxuat", authMiddleware.loggedin, dangnhap.dangxuat);

  // .get("/verify", dangky.verify);
  app.use(router);
};
