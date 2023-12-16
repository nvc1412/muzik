const sql = require("./connectDB");

const CaSi = function (casi) {
  this.id = casi.id;
  this.avatar = casi.avatar;
  this.tencs = casi.tencs;
  this.ngaysinh = casi.ngaysinh;
  this.mota = casi.mota;
  this.luotthich = casi.luotthich;
  this.thoigiantao = casi.thoigiantao;
};

CaSi.create = (newCaSi, result) => {
  sql.query(
    "INSERT INTO casi (`avatar`, `tencs`, `ngaysinh`, `mota`) VALUES (?, ?, ?, ?)",
    [newCaSi.avatar, newCaSi.tencs, newCaSi.ngaysinh, newCaSi.mota],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...newCaSi });
    }
  );
};

CaSi.read = (result) => {
  sql.query(`SELECT * FROM casi`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

CaSi.update = (newCaSi, result) => {
  sql.query(
    `UPDATE casi SET avatar = ?, tencs = ?, ngaysinh = ? , mota = ? WHERE id = ?`,
    [newCaSi.avatar, newCaSi.tencs, newCaSi.ngaysinh, newCaSi.mota, newCaSi.id],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...newCaSi });
    }
  );
};

CaSi.delete = (id, result) => {
  sql.query(`DELETE FROM casi WHERE id = ?`, id, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

CaSi.findById = (id, result) => {
  sql.query(`SELECT * FROM casi WHERE id = '${id}'`, (err, res) => {
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

CaSi.getAllName = (result) => {
  sql.query(`SELECT id, tencs FROM casi`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

CaSi.getCaSiHot = (result) => {
  sql.query(
    `SELECT * FROM casi ORDER BY casi.luotthich DESC LIMIT 8;`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

module.exports = CaSi;
