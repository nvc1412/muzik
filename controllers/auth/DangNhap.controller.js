const TaiKhoan = require("../../models/TaiKhoan.model");
const bcrypt = require("bcrypt");

exports.showDangNhap = (req, res) => {
  res.render("auth/dangnhap");
};

exports.dangnhap = (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    TaiKhoan.findByUsername(email, (err, tk) => {
      if (err || tk) {
        bcrypt.compare(password, tk.matkhau, (err, result) => {
          if (result == true) {
            if (tk.trangthai == "Khóa") {
              // Thông tin tài khoản bị khóa.
              const conflictError = "Tài khoản bị khóa.";
              res.render("auth/dangnhap", { email, password, conflictError });
            } else {
              req.session.loggedin = true;
              req.session.tk = tk;
              res.redirect("/trangchu");
            }
          } else {
            // Thông tin tài khoản hoặc mật khẩu không chính xác.
            const conflictError = "Tài khoản hoặc mật khẩu không chính xác.";
            res.render("auth/dangnhap", { email, password, conflictError });
          }
        });
      } else {
        TaiKhoan.findByEmail(email, (err, tk) => {
          if (err || tk) {
            bcrypt.compare(password, tk.matkhau, (err, result) => {
              if (result == true) {
                if (tk.trangthai == "Khóa") {
                  // Thông tin tài khoản bị khóa.
                  const conflictError = "Tài khoản bị khóa.";
                  res.render("auth/dangnhap", {
                    email,
                    password,
                    conflictError,
                  });
                } else {
                  req.session.loggedin = true;
                  req.session.tk = tk;
                  res.redirect("/trangchu");
                }
              } else {
                // Thông tin tài khoản hoặc mật khẩu không chính xác.
                const conflictError =
                  "Tài khoản hoặc mật khẩu không chính xác.";
                res.render("auth/dangnhap", { email, password, conflictError });
              }
            });
          } else {
            // Thông tin tài khoản hoặc mật khẩu không chính xác.
            const conflictError = "Tài khoản hoặc mật khẩu không chính xác.";
            res.render("auth/dangnhap", { email, password, conflictError });
          }
        });
      }
    });
  } else {
    // Không hợp lệ
    const conflictError = "Thông tin tài khoản không hợp lệ.";
    res.render("auth/dangnhap", { email, password, conflictError });
  }
};

exports.dangxuat = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.redirect("Error");
    }
    res.redirect("/dangnhap");
  });
};
