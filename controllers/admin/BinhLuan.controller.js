const BinhLuan = require("../../models/BinhLuan.model");

exports.showBinhLuan = (req, res) => {
  BinhLuan.read((err, data) => {
    if (!err) {
      res.render("admin/danhsachbinhluan", {
        data: data,
        currentPath: "/admin/binhluan",
      });
    } else {
      res.render("Error");
    }
  });
};

exports.XoaBinhLuan = (req, res) => {
  const id = req.params.id;
  if (id) {
    BinhLuan.delete(id, (err) => {
      if (!err) {
        res.redirect("/admin/binhluan");
      } else {
        res.render("Error");
      }
    });
  } else {
    // Không có id

    res.render("Error");
  }
};
