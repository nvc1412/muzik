const BaiHat = require("../../models/BaiHat.model");
const TheLoai = require("../../models/TheLoai.model");
const CaSi = require("../../models/CaSi.model");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

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

exports.showBaiHat = (req, res) => {
  BaiHat.read((err, data) => {
    if (!err) {
      res.render("admin/danhsachbaihat", {
        data: data,
        currentPath: "/admin/baihat",
      });
    } else {
      res.render("Error");
    }
  });
};

exports.showThemBaiHat = (req, res) => {
  var data = [];
  TheLoai.getAllName((err, tl) => {
    if (!err && tl) {
      data.push(tl);
      CaSi.getAllName((err, cs) => {
        if (!err && cs) {
          data.push(cs);
          res.render("admin/thembaihat", {
            data: data,
            currentPath: "/admin/baihat",
          });
        } else {
          res.render("Error");
        }
      });
    } else {
      res.render("Error");
    }
  });
};

exports.showSuaBaiHat = (req, res) => {
  const id = req.params.id;
  var data = [];

  if (id) {
    BaiHat.findById(id, (err, bh) => {
      if (!err && bh) {
        data.push(bh);
        TheLoai.getAllName((err, tl) => {
          if (!err && tl) {
            data.push(tl);
            CaSi.getAllName((err, cs) => {
              if (!err && cs) {
                data.push(cs);
                res.render("admin/suabaihat", {
                  data: data,
                  currentPath: "/admin/baihat",
                });
              } else {
                res.render("Error");
              }
            });
          }
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

exports.ThemBaiHat = async (req, res) => {
  const { tenbh, id_tl, id_cs, mota } = req.body;
  // Xử lý lấy đường dẫn ảnh và tên file nhạc
  const data = req.files;
  const nhac = data.nhac[0] ? data.nhac[0].filename : "";
  const poster_result = await cloudinary.uploader.upload(data.poster[0].path, {
    folder: "images", // thư mục lưu trên cloud
  });
  const poster = poster_result ? poster_result.secure_url : "";
  fs.unlinkSync(data.poster[0].path); // Xóa ảnh đã tải lên local

  if (nhac && id_tl && id_cs) {
    const bh = new BaiHat({
      poster: poster,
      nhac: nhac,
      tenbh: tenbh,
      id_tl: id_tl,
      id_cs: id_cs,
      mota: mota,
    });
    BaiHat.create(bh, (err, bh) => {
      if (!err) {
        res.redirect("/admin/baihat");
      }
    });
  } else {
    if (poster) {
      cloudinary.uploader.destroy(poster.filename);
    }
    // Không hợp lệ
    res.render("Error");
  }
};

exports.SuaBaiHat = (req, res) => {
  const { id, tenbh, id_tl, id_cs, url_poster, nhac, mota } = req.body;
  var poster = req.file;

  // không chọn ảnh mới
  if (poster === undefined) {
    poster = url_poster;
  } else {
    // có chọn ảnh
    // hủy ảnh cũ
    const url_filename = laypath(url_poster);
    cloudinary.uploader.destroy(url_filename);
    poster = poster.path;
  }

  if (id && tenbh && id_tl && id_cs && nhac) {
    const bh = new BaiHat({
      id: id,
      poster: poster,
      tenbh: tenbh,
      id_tl: id_tl,
      id_cs: id_cs,
      nhac: nhac,
      mota: mota,
    });
    BaiHat.update(bh, (err, bh) => {
      if (!err) {
        res.redirect("/admin/baihat");
      } else {
        res.render("Error");
      }
    });
  } else {
    if (poster) {
      cloudinary.uploader.destroy(poster.filename);
    }
    // Không hợp lệ
    res.render("Error");
  }
};

exports.XoaBaiHat = (req, res) => {
  const id = req.params.id;
  if (id) {
    BaiHat.findById(id, (err, baihat) => {
      if (err) {
        res.redirect("/admin/baihat");
      } else {
        const poster = laypath(baihat.poster);
        const nhac = "public\\music\\" + baihat.nhac;
        BaiHat.delete(id, (err) => {
          if (!err) {
            if (poster) {
              cloudinary.uploader.destroy(poster);
              fs.unlinkSync(nhac);
            }
            res.redirect("/admin/baihat");
          } else {
            if (poster) {
              cloudinary.uploader.destroy(poster);
              fs.unlinkSync(nhac);
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
