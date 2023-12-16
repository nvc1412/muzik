const authMiddleware = require("../middlewares/auth.middleware");
const listplay = require("../middlewares/listplay.middleware");
const taikhoan = require("../controllers/admin/TaiKhoan.controller");

module.exports = (app) => {
  var router = require("express").Router();

  // Lấy danh sách
  router.get(
    "/admin/taikhoan",
    authMiddleware.isAdmin,
    listplay.DanhSachPhat,
    taikhoan.showTaiKhoan
  );

  //  Sửa
  router
    .get(
      "/admin/taikhoan/suataikhoan/:id",
      authMiddleware.isAdmin,
      listplay.DanhSachPhat,
      taikhoan.showSuaTaiKhoan
    )
    .post(
      "/admin/taikhoan/suataikhoan",
      authMiddleware.isAdmin,
      listplay.DanhSachPhat,
      taikhoan.SuaTaiKhoan
    );

  // xóa
  router.get(
    "/admin/taikhoan/xoataikhoan/:id",
    authMiddleware.isAdmin,
    listplay.DanhSachPhat,
    taikhoan.XoaTaiKhoan
  );

  app.use(router);
};
