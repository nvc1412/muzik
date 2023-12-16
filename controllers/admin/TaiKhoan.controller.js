const TaiKhoan = require("../../models/TaiKhoan.model");

exports.showTaiKhoan = (req, res) => {
  TaiKhoan.read((err, data) => {
    if (!err) {
      res.render("admin/danhsachtaikhoan", {
        data: data,
        currentPath: "/admin/taikhoan",
      });
    } else {
      res.render("Error");
    }
  });
};

exports.showSuaTaiKhoan = (req, res) => {
  const dc = [
    "An Giang",
    "Bà Rịa - Vũng Tàu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bạc Liêu",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Định",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Bình Thuận",
    "Cà Mau",
    "Cao Bằng",
    "Đắk Lắk",
    "Đắk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hà Tĩnh",
    "Hải Dương",
    "Hậu Giang",
    "Hòa Bình",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lâm Đồng",
    "Lạng Sơn",
    "Lào Cai",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Quảng Bình",
    "Quảng Bình",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên Huế",
    "Tiền Giang",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái",
    "Phú Yên",
    "TP.Cần Thơ",
    "TP.Đà Nẵng",
    "TP.Hải Phòng",
    "TP.Hà Nội",
    "TP.Hồ Chí Minh",
  ];
  const id = req.params.id;
  if (id) {
    TaiKhoan.findById(id, (err, tk) => {
      if (!err && tk) {
        res.render("admin/suataikhoan", {
          data: tk,
          dc: dc,
          currentPath: "/admin/taikhoan",
        });
      } else {
        res.render("Error");
      }
    });
  } else {
    // Không có id
    res.render("Error");
  }
};

exports.SuaTaiKhoan = (req, res) => {
  const { id, quyen, trangthai } = req.body;
  if (id && quyen && trangthai) {
    const tk = new TaiKhoan({
      id: id,
      quyen: quyen,
      trangthai: trangthai,
    });
    TaiKhoan.update(tk, (err, tk) => {
      if (!err) {
        res.redirect("/admin/taikhoan");
      }
    });
  } else {
    // Không hợp lệ

    res.render("Error");
  }
};

exports.XoaTaiKhoan = (req, res) => {
  const id = req.params.id;
  if (id) {
    TaiKhoan.delete(id, (err) => {
      if (err) {
        res.render("Error");
      } else {
        res.redirect("/admin/taikhoan");
      }
    });
  } else {
    // Không có id
    res.render("Error");
  }
};
