const authMiddleware = require("../middlewares/auth.middleware");
const uploadimageMiddleware = require("../middlewares/uploadimage.middleware");
const uploadnhacMiddleware = require("../middlewares/uploadnhac.middleware");
const baihat = require("../controllers/admin/BaiHat.controller");
const listplay = require("../middlewares/listplay.middleware");

module.exports = (app) => {
  var router = require("express").Router();

  // lấy danh sách
  router.get(
    "/admin/baihat",
    authMiddleware.isAdmin,
    listplay.DanhSachPhat,
    baihat.showBaiHat
  );

  // thêm
  router
    .get(
      "/admin/baihat/thembaihat",
      authMiddleware.isAdmin,
      listplay.DanhSachPhat,
      baihat.showThemBaiHat
    )
    .post(
      "/admin/baihat/thembaihat",
      uploadnhacMiddleware.fields([
        { name: "poster", maxCount: 1 },
        { name: "nhac", maxCount: 1 },
      ]),
      listplay.DanhSachPhat,
      baihat.ThemBaiHat
    );

  //  Sửa
  router
    .get(
      "/admin/baihat/suabaihat/:id",
      authMiddleware.isAdmin,
      listplay.DanhSachPhat,
      baihat.showSuaBaiHat
    )
    .post(
      "/admin/baihat/suabaihat",
      uploadimageMiddleware.single("poster"),
      listplay.DanhSachPhat,
      baihat.SuaBaiHat
    );

  // xóa
  router.get(
    "/admin/baihat/xoabaihat/:id",
    authMiddleware.isAdmin,
    listplay.DanhSachPhat,
    baihat.XoaBaiHat
  );

  app.use(router);
};
