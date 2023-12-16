const CaSi = require("../../models/CaSi.model");
const cloudinary = require("cloudinary").v2;

function laypath(urlString) {
  // Sử dụng biểu thức chính quy để tìm chuỗi cần thiết trong URL
  const regex = /\/v\d+\/(.+?)\.(jpg|png|jpeg)$/i;
  const match = urlString.match(regex);

  // Nếu tìm thấy phù hợp, trả về phần path cần thiết
  if (match) {
    return match[1];
  } else {
    // Nếu không tìm thấy, trả về null hoặc một giá trị mặc định khác tùy ý
    return null;
  }
}

exports.showCaSi = (req, res) => {
  CaSi.read((err, data) => {
    if (!err) {
      res.render("admin/danhsachcasi", {
        data: data,
        currentPath: "/admin/casi",
      });
    } else {
      res.render("Error");
    }
  });
};

exports.showThemCaSi = (req, res) => {
  res.render("admin/themcasi", { currentPath: "/admin/casi" });
};

exports.showSuaCaSi = (req, res) => {
  const id = req.params.id;
  if (id) {
    CaSi.findById(id, (err, cs) => {
      if (!err && cs) {
        res.render("admin/suacasi", {
          data: cs,
          currentPath: "/admin/casi",
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

exports.ThemCaSi = (req, res) => {
  const { tencs, ngaysinh, mota } = req.body;
  var avatar = req.file; // Lấy đường dẫn ảnh đã được lưu

  // không chọn ảnh mới
  if (avatar === undefined) {
    avatar = "";
  } else {
    // có chọn ảnh
    avatar = avatar.path;
  }
  if (tencs && ngaysinh) {
    const cs = new CaSi({
      avatar: avatar,
      tencs: tencs,
      ngaysinh: ngaysinh,
      mota: mota,
    });
    CaSi.create(cs, (err, cs) => {
      if (!err) {
        res.redirect("/admin/casi");
      }
    });
  } else {
    if (avatar) {
      cloudinary.uploader.destroy(avatar.filename);
    }
    // Không hợp lệ

    res.render("Error");
  }
};

exports.SuaCaSi = (req, res) => {
  const { id, tencs, ngaysinh, mota, url_avatar } = req.body;
  var avatar = req.file;

  // không chọn ảnh mới
  if (avatar === undefined) {
    avatar = url_avatar;
  } else {
    // có chọn ảnh
    // hủy ảnh cũ
    const url_filename = laypath(url_avatar);
    cloudinary.uploader.destroy(url_filename);
    avatar = avatar.path;
  }

  if (id && tencs) {
    const cs = new CaSi({
      id: id,
      avatar: avatar,
      tencs: tencs,
      ngaysinh: ngaysinh,
      mota: mota,
    });
    CaSi.update(cs, (err, cs) => {
      if (!err) {
        res.redirect("/admin/casi");
      }
    });
  } else {
    if (avatar) {
      cloudinary.uploader.destroy(avatar.filename);
    }
    // Không hợp lệ

    res.render("Error");
  }
};

exports.XoaCaSi = (req, res) => {
  const id = req.params.id;
  if (id) {
    CaSi.findById(id, (err, casi) => {
      if (err) {
        res.redirect("/admin/casi");
      } else {
        const avatar = laypath(casi.avatar);
        CaSi.delete(id, (err) => {
          if (!err) {
            if (avatar) {
              cloudinary.uploader.destroy(avatar);
            }
            res.redirect("/admin/casi");
          } else {
            if (avatar) {
              cloudinary.uploader.destroy(avatar);
            }

            res.render("Error");
          }
        });
      }
    });
  } else {
    // Không có id

    res.render("Error");
  }
};
