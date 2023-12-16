const authMiddleware = require("../middlewares/auth.middleware");
const listplay = require("../middlewares/listplay.middleware");
const trangchuadmin = require("../controllers/admin/TrangChuAdmin.controller");

module.exports = (app) => {
  var router = require("express").Router();

  // Lấy danh sách
  router.get(
    "/admin/trangchuadmin",
    authMiddleware.isAdmin,
    listplay.DanhSachPhat,
    trangchuadmin.showTrangChuAdmin
  );

  app.use(router);
};
