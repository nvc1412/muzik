const BaiHat = require("../models/BaiHat.model");

exports.DanhSachPhat = (req, res, next) => {
  BaiHat.read((err, data) => {
    if (!err) {
      res.locals.list_bh = data;
      next();
    } else {
      res.redirect("Error");
    }
  });
};
