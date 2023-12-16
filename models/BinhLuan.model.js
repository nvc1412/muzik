const sql = require("./connectDB");

const BinhLuan = function (binhluan) {
  this.id = binhluan.id;
  this.id_tk = binhluan.id_tk;
  this.id_bh = binhluan.id_bh;
  this.noidung = binhluan.noidung;
  this.thoigiantao = binhluan.thoigiantao;
};

BinhLuan.read = (result) => {
  sql.query(
    `SELECT 
        binhluan.id, 
        nguoidung.avatar, 
        CONCAT(nguoidung.ho, ' ', nguoidung.ten) AS ten,
        baihat.tenbh, 
        binhluan.noidung, 
        binhluan.thoigiantao
    FROM 
        binhluan
    JOIN 
        nguoidung ON binhluan.id_tk = nguoidung.id_tk
    JOIN 
        baihat ON binhluan.id_bh = baihat.id;`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

BinhLuan.delete = (id, result) => {
  sql.query(`DELETE FROM binhluan WHERE id = ?`, id, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

BinhLuan.findById = (id, result) => {
  sql.query(`SELECT * FROM binhluan WHERE id = '${id}'`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (result.length) {
      result(null, res[0]);
      return;
    }
    result(null, null);
  });
};

module.exports = BinhLuan;
