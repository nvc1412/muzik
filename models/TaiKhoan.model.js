const sql = require("./connectDB");

const TaiKhoan = function (taikhoan) {
  this.id = taikhoan.id;
  this.username = taikhoan.username;
  this.email = taikhoan.email;
  this.matkhau = taikhoan.matkhau;
  this.trangthai = taikhoan.trangthai;
  this.quyen = taikhoan.quyen;
  this.thoigiantao = taikhoan.thoigiantao;
};

TaiKhoan.create = (newTaiKhoan, result) => {
  sql.query(
    "INSERT INTO taikhoan (`username`, `email`, `matkhau`, `trangthai`, `quyen`) VALUES (?, ?, ?, ?, ?)",
    [
      newTaiKhoan.username,
      newTaiKhoan.email,
      newTaiKhoan.matkhau,
      newTaiKhoan.trangthai,
      newTaiKhoan.quyen,
    ],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...newTaiKhoan });
    }
  );
};

TaiKhoan.update = (newTaiKhoan, result) => {
  sql.query(
    `UPDATE taikhoan SET quyen = ?, trangthai = ? WHERE id = ?`,
    [newTaiKhoan.quyen, newTaiKhoan.trangthai, newTaiKhoan.id],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...newTaiKhoan });
    }
  );
};

TaiKhoan.findByEmail = (email, result) => {
  sql.query(`SELECT * FROM taikhoan WHERE email = '${email}'`, (err, res) => {
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

TaiKhoan.findById = (id, result) => {
  sql.query(
    `SELECT 
          taikhoan.id,
          nguoidung.avatar,
          nguoidung.ho,
          nguoidung.ten,
          nguoidung.sdt,
          taikhoan.email,
          nguoidung.diachi,
          taikhoan.quyen,
          taikhoan.trangthai
      FROM
          taikhoan
      LEFT JOIN
          nguoidung ON nguoidung.id_tk = taikhoan.id
      WHERE
          taikhoan.id = ${id};`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      if (result.length) {
        result(null, res[0]);
        return;
      }
      result(null, null);
    }
  );
};

TaiKhoan.findByUsername = (email, result) => {
  sql.query(
    `SELECT * FROM taikhoan WHERE username = '${email}'`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      if (result.length) {
        result(null, res[0]);
        return;
      }
      result(null, null);
    }
  );
};

TaiKhoan.read = (result) => {
  sql.query(
    `SELECT
      taikhoan.id,
      nguoidung.avatar,
      CONCAT(nguoidung.ho, ' ', nguoidung.ten) AS ten,
      nguoidung.sdt,
      taikhoan.email,
      nguoidung.diachi,
      taikhoan.thoigiantao,
      taikhoan.trangthai,
      taikhoan.quyen
    FROM
      taikhoan
    LEFT JOIN nguoidung ON taikhoan.id = nguoidung.id_tk;`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

TaiKhoan.delete = (id, result) => {
  sql.query(`DELETE FROM taikhoan WHERE id = ?`, id, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

TaiKhoan.DoiMatKhau = (newTaiKhoan, result) => {
  sql.query(
    `UPDATE taikhoan SET matkhau = ? WHERE username = ?`,
    [newTaiKhoan.matkhau, newTaiKhoan.username],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...newTaiKhoan });
    }
  );
};

// TaiKhoan.verify = (email, result) => {};

module.exports = TaiKhoan;
