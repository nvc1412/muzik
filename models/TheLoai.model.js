const sql = require("./connectDB");

const TheLoai = function (theloai) {
  this.id = theloai.id;
  this.theloai = theloai.theloai;
  this.mota = theloai.mota;
};

TheLoai.create = (newTheLoai, result) => {
  sql.query(
    "INSERT INTO theloai (`theloai`, `mota`) VALUES (?, ?)",
    [newTheLoai.theloai, newTheLoai.mota],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...newTheLoai });
    }
  );
};

TheLoai.read = (result) => {
  sql.query(`SELECT * FROM theloai`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

TheLoai.update = (newTheLoai, result) => {
  sql.query(
    `UPDATE theloai SET theloai = ?, mota = ? WHERE id = ?`,
    [newTheLoai.theloai, newTheLoai.mota, newTheLoai.id],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...newTheLoai });
    }
  );
};

TheLoai.delete = (id, result) => {
  sql.query(`DELETE FROM theloai WHERE id = ?`, id, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

TheLoai.findById = (id, result) => {
  sql.query(`SELECT * FROM theloai WHERE id = '${id}'`, (err, res) => {
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

TheLoai.getAllName = (result) => {
  sql.query(`SELECT id, theloai FROM theloai`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = TheLoai;
