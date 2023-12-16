const TaiKhoan = require("../models/TaiKhoan.model");
const bcrypt = require("bcrypt");

exports.showThongTinCaNhan = (req, res) => {
  TaiKhoan.read((err, data) => {
    if (!err) {
      res.render("user/thongtincanhan", {
        data: data,
        currentPath: "/user/thongtincanhan",
      });
    } else {
      res.render("Error");
    }
  });
};

exports.showChinhSuaThongTin = (req, res) => {
  TaiKhoan.read((err, data) => {
    if (!err) {
      res.render("user/chinhsuathongtin", {
        data: data,
        currentPath: "/user/chinhsuathongtin",
      });
    } else {
      res.render("Error");
    }
  });
};

exports.showAlbumCuaBan = (req, res) => {
  TaiKhoan.read((err, data) => {
    if (!err) {
      res.render("user/albumscuaban", {
        data: data,
        currentPath: "/user/albumcuaban",
      });
    } else {
      res.render("Error");
    }
  });
};

exports.DoiMatKhau = (req, res) => {
  const { username, cpass, npass, vpass } = req.body;
  //   console.log(id);
  //   console.log(cpass);
  //   console.log(npass);
  //   console.log(vpass);
  //   return;
  if (username && cpass && npass && vpass) {
    if (npass !== vpass) {
      const conflictError = "Mật khẩu xác thực không khớp.";
      res.render("user/chinhsuathongtin", {
        cpass,
        npass,
        vpass,
        conflictError,
        currentPath: "/user/chinhsuathongtin",
      });
    } else {
      TaiKhoan.findByUsername(username, (err, tk) => {
        if (err || tk) {
          bcrypt.compare(cpass, tk.matkhau, (err, result) => {
            if (result == true) {
              bcrypt
                .hash(vpass, parseInt(process.env.BCRYPT_SALT_ROUND))
                .then((hashed) => {
                  // Tạo 1 đối tượng tài khoản
                  const tk = new TaiKhoan({
                    username: username,
                    matkhau: hashed,
                  });
                  TaiKhoan.DoiMatKhau(tk, (err, tk) => {
                    if (!err) {
                      // Thông tin tài khoản hoặc mật khẩu không chính xác.
                      const conflictError = "Đổi mật khẩu thành công.";
                      res.render("user/chinhsuathongtin", {
                        conflictError,
                        currentPath: "/user/chinhsuathongtin",
                      });
                    }
                  });
                });
            } else {
              // Thông tin tài khoản hoặc mật khẩu không chính xác.
              const conflictError = "Mật khẩu cũ không chính xác.";
              res.render("user/chinhsuathongtin", {
                cpass,
                npass,
                vpass,
                conflictError,
                currentPath: "/user/chinhsuathongtin",
              });
            }
          });
        } else {
          res.render("Error");
        }
      });
    }
  } else {
    res.render("Error");
  }
};
