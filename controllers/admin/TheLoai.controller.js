const TheLoai = require("../../models/TheLoai.model");

exports.showTheLoai = (req, res) => {
  TheLoai.read((err, data) => {
    if (!err) {
      res.render("admin/danhsachtheloai", {
        data: data,
        currentPath: "/admin/theloai",
      });
    } else {
      res.render("Error");
    }
  });
};

exports.showThemTheLoai = (req, res) => {
  res.render("admin/themtheloai", { currentPath: "/admin/theloai" });
};

exports.showSuaTheLoai = (req, res) => {
  const id = req.params.id;
  if (id) {
    TheLoai.findById(id, (err, tl) => {
      if (!err && tl) {
        res.render("admin/suatheloai", {
          data: tl,
          currentPath: "/admin/theloai",
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

exports.ThemTheLoai = (req, res) => {
  const { theloai, mota } = req.body;
  if (theloai) {
    const tl = new TheLoai({
      theloai: theloai,
      mota: mota,
    });
    TheLoai.create(tl, (err, tl) => {
      if (!err) {
        res.redirect("/admin/theloai");
      }
    });
  } else {
    // Không hợp lệ

    res.render("Error");
  }
};

exports.SuaTheLoai = (req, res) => {
  const { id, theloai, mota } = req.body;
  if (id && theloai) {
    const tl = new TheLoai({
      id: id,
      theloai: theloai,
      mota: mota,
    });
    TheLoai.update(tl, (err, tl) => {
      if (!err) {
        res.redirect("/admin/theloai");
      }
    });
  } else {
    // Không hợp lệ

    res.render("Error");
  }
};

exports.XoaTheLoai = (req, res) => {
  const id = req.params.id;
  if (id) {
    TheLoai.delete(id, (err) => {
      if (err) {
        res.render("Error");
      } else {
        res.redirect("/admin/theloai");
      }
    });
  } else {
    // Không có id
    res.render("Error");
  }
};
