const authMiddleware = require("../middlewares/auth.middleware");
const listplay = require("../middlewares/listplay.middleware");
const theloai = require("../controllers/admin/TheLoai.controller");

module.exports = (app) => {
  var router = require("express").Router();

  // Lấy danh sách
  router.get(
    "/admin/theloai",
    authMiddleware.isAdmin,
    listplay.DanhSachPhat,
    theloai.showTheLoai
  );

  // thêm
  router
    .get(
      "/admin/theloai/themtheloai",
      authMiddleware.isAdmin,
      listplay.DanhSachPhat,
      theloai.showThemTheLoai
    )
    .post("/admin/theloai/themtheloai", theloai.ThemTheLoai);

  //  Sửa
  router
    .get(
      "/admin/theloai/suatheloai/:id",
      authMiddleware.isAdmin,
      listplay.DanhSachPhat,
      theloai.showSuaTheLoai
    )
    .post("/admin/theloai/suatheloai", theloai.SuaTheLoai);

  // xóa
  router.get(
    "/admin/theloai/xoatheloai/:id",
    authMiddleware.isAdmin,
    listplay.DanhSachPhat,
    theloai.XoaTheLoai
  );

  app.use(router);
};
