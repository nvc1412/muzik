module.exports = (app) => {
  var router = require("express").Router();

  // CHỨC NĂNG TRANG CHỦ ADMIN
  require("./TrangChuAdmin.route")(app);

  // CHỨC NĂNG QUẢN LÝ THỂ LOẠI
  require("./TheLoai.route")(app);

  // CHỨC NĂNG QUẢN LÝ TÀI KHOẢN
  require("./TaiKhoan.route")(app);

  // CHỨC NĂNG QUẢN LÝ CA SĨ
  require("./CaSi.route")(app);

  // CHỨC NĂNG QUẢN LÝ BÀI HÁT
  require("./BaiHat.route")(app);

  // CHỨC NĂNG QUẢN LÝ BÌNH LUẬN
  require("./BinhLuan.route")(app);

  app.use(router);
};
