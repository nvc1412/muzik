const authMiddleware = require("../middlewares/auth.middleware");
const uploadimageMiddleware = require("../middlewares/uploadimage.middleware");
const casi = require("../controllers/admin/CaSi.controller");
const listplay = require("../middlewares/listplay.middleware");

module.exports = (app) => {
  var router = require("express").Router();

  // lấy danh sách
  router.get(
    "/admin/casi",
    authMiddleware.isAdmin,
    listplay.DanhSachPhat,
    casi.showCaSi
  );

  // thêm
  router
    .get(
      "/admin/casi/themcasi",
      authMiddleware.isAdmin,
      listplay.DanhSachPhat,
      casi.showThemCaSi
    )
    .post(
      "/admin/casi/themcasi",
      uploadimageMiddleware.single("avatar"),
      listplay.DanhSachPhat,
      casi.ThemCaSi
    );

  //  Sửa
  router
    .get(
      "/admin/casi/suacasi/:id",
      authMiddleware.isAdmin,
      listplay.DanhSachPhat,
      casi.showSuaCaSi
    )
    .post(
      "/admin/casi/suacasi",
      uploadimageMiddleware.single("avatar"),
      listplay.DanhSachPhat,
      casi.SuaCaSi
    );

  // xóa
  router.get(
    "/admin/casi/xoacasi/:id",
    authMiddleware.isAdmin,
    listplay.DanhSachPhat,
    casi.XoaCaSi
  );

  app.use(router);
};
