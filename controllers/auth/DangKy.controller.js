const TaiKhoan = require("../../models/TaiKhoan.model");
const bcrypt = require("bcrypt");
require("dotenv/config");
const mailer = require("../../utils/mailer");

exports.showDangKy = (req, res) => {
  res.render("auth/dangky");
};

exports.dangky = (req, res) => {
  const { email, password, username } = req.body;
  if (email && password && username) {
    TaiKhoan.findByUsername(username, (err, tk) => {
      if (err || tk) {
        // username đã được tạo
        const conflictError = "Username đã được tạo.";
        res.render("auth/dangky", { email, password, username, conflictError });
      } else {
        TaiKhoan.findByEmail(email, (err, tk) => {
          if (err || tk) {
            // email đã được tạo
            const conflictError = "Email đã được tạo.";
            res.render("auth/dangky", {
              email,
              password,
              username,
              conflictError,
            });
          } else {
            bcrypt
              .hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
              .then((hashed) => {
                // Tạo 1 đối tượng tài khoản
                const tk = new TaiKhoan({
                  username: username,
                  email: email,
                  matkhau: hashed,
                  trangthai: "Hoạt Động",
                  quyen: "Thành viên",
                });
                TaiKhoan.create(tk, (err, tk) => {
                  if (!err) {
                    res.redirect("/dangnhap");
                  }
                });
              });
          }
        });
      }
    });
  } else {
    const conflictError = "Thông tin tài khoản không hợp lệ.";
    res.render("auth/dangky", { email, password, username, conflictError });
  }
};
