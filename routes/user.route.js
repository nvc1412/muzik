const authMiddleware = require("../middlewares/auth.middleware");
const listplay = require("../middlewares/listplay.middleware");
const user = require("../controllers/User.controller");

module.exports = (app) => {
  var router = require("express").Router();

  // Lấy danh sách
  router.get(
    "/thongtincanhan",
    authMiddleware.loggedin,
    listplay.DanhSachPhat,
    user.showThongTinCaNhan
  );

  router
    .get(
      "/chinhsuathongtin",
      authMiddleware.loggedin,
      listplay.DanhSachPhat,
      user.showChinhSuaThongTin
    )
    .post(
      "/chinhsuathongtin/doimatkhau",
      authMiddleware.loggedin,
      listplay.DanhSachPhat,
      user.DoiMatKhau
    );

  router.get(
    "/albumcuaban",
    authMiddleware.loggedin,
    listplay.DanhSachPhat,
    user.showAlbumCuaBan
  );

  app.use(router);
};
