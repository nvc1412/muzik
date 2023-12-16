const authMiddleware = require("../middlewares/auth.middleware");
const listplay = require("../middlewares/listplay.middleware");
const trangchu = require("../controllers/TrangChu.controller");

module.exports = (app) => {
  var router = require("express").Router();

  // Lấy danh sách
  router
    .get(
      "/trangchu",
      authMiddleware.loggedin,
      listplay.DanhSachPhat,
      trangchu.showTrangChu
    )
    .post("/trangchu", authMiddleware.loggedin, trangchu.luotthich);

  // chi tiết ca sĩ
  router.get(
    "/trangchu/casi/:id",
    authMiddleware.loggedin,
    listplay.DanhSachPhat,
    trangchu.showChiTietCaSi
  );
  app.use(router);
};
