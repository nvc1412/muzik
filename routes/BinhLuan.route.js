const authMiddleware = require("../middlewares/auth.middleware");
const listplay = require("../middlewares/listplay.middleware");
const binhluan = require("../controllers/admin/BinhLuan.controller");

module.exports = (app) => {
  var router = require("express").Router();

  // lấy danh sách
  router.get(
    "/admin/binhluan",
    authMiddleware.isAdmin,
    listplay.DanhSachPhat,
    binhluan.showBinhLuan
  );

  // xóa
  router.get(
    "/admin/binhluan/xoabinhluan/:id",
    authMiddleware.isAdmin,
    listplay.DanhSachPhat,
    binhluan.XoaBinhLuan
  );

  app.use(router);
};
