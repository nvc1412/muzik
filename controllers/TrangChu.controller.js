const BaiHat = require("../models/BaiHat.model");
const CaSi = require("../models/CaSi.model");

exports.showTrangChu = (req, res) => {
  BaiHat.getBXH(req.session.tk.id, (err, data) => {
    if (!err) {
      dataBXH = data;
      BaiHat.getNew(req.session.tk.id, (err, data) => {
        if (!err) {
          dataNEW = data;

          BaiHat.getPhoBien(req.session.tk.id, (err, data) => {
            if (!err) {
              dataPhoBien = data;

              CaSi.getCaSiHot((err, data) => {
                if (!err) {
                  dataCaSi = data;
                  res.render("TrangChu", {
                    dataBXH: dataBXH,
                    dataNEW: dataNEW,
                    dataPhoBien: dataPhoBien,
                    dataCaSi: dataCaSi,
                    currentPath: "/trangchu",
                  });
                } else {
                  res.render("Error");
                }
              });
            } else {
              res.render("Error");
            }
          });

          // CaSi.getCaSiHot((err, data) => {
          //   if (!err) {
          //     dataCaSi = data;
          //     res.render("TrangChu", {
          //       dataBXH: dataBXH,
          //       dataNEW: dataNEW,
          //       dataCaSi: dataCaSi,
          //       currentPath: "/trangchu",
          //     });
          //   } else {
          //     res.render("Error");
          //   }
          // });
        } else {
          res.render("Error");
        }
      });
    } else {
      res.render("Error");
    }
  });
};

exports.luotthich = (req, res) => {
  const idSong = req.body.idSong;
  const idTK = req.body.idTK;

  BaiHat.findLike(idSong, idTK, (err, data) => {
    if (!err) {
      if (data != "" && data != null && data != undefined && data != []) {
        BaiHat.unLike(data[0].id, (err, data) => {
          if (!err) {
            res.json({
              success: true,
              isLiked: false,
              message: "Thành công",
            });
          } else {
            res.render("Error");
          }
        });
      } else {
        BaiHat.like(idSong, idTK, (err, data) => {
          if (!err) {
            res.json({
              success: true,
              isLiked: true /* hoặc false */,
              message: "Thành công",
            });
          } else {
            res.render("Error");
          }
        });
      }
    } else {
      res.render("Error");
    }
  });
};

exports.showChiTietCaSi = (req, res) => {
  const id = req.params.id;
  if (id) {
    CaSi.findById(id, (err, cs) => {
      if (!err && cs) {
        BaiHat.getBHCS(id, req.session.tk.id, (err, data) => {
          if (!err) {
            dataBHCS = data;
            res.render("ChiTietCaSi", {
              dataCS: cs,
              dataBHCS: dataBHCS,
              currentPath: "/trangchu",
            });
          } else {
            res.render("Error");
          }
        });

        // res.render("ChiTietCaSi", {
        //   data: cs,
        //   currentPath: "/trangchu",
        // });
      } else {
        res.render("Error");
      }
    });
  } else {
    res.render("Error");
  }
};
