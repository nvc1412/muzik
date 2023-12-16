const sql = require("./connectDB");

const BaiHat = function (baihat) {
  this.id = baihat.id;
  this.poster = baihat.poster;
  this.nhac = baihat.nhac;
  this.tenbh = baihat.tenbh;
  this.id_tl = baihat.id_tl;
  this.id_cs = baihat.id_cs;
  this.mota = baihat.mota;
  this.luotthich = baihat.luotthich;
};

BaiHat.create = (newBaiHat, result) => {
  sql.query(
    "INSERT INTO baihat (`poster`, `nhac`, `tenbh`, `id_tl`, `id_cs`, `mota`) VALUES (?, ?, ?, ?, ?, ?)",
    [
      newBaiHat.poster,
      newBaiHat.nhac,
      newBaiHat.tenbh,
      newBaiHat.id_tl,
      newBaiHat.id_cs,
      newBaiHat.mota,
    ],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...newBaiHat });
    }
  );
};

BaiHat.read = (result) => {
  sql.query(
    `SELECT 
        baihat.id, 
        baihat.poster, 
        baihat.tenbh,
        baihat.nhac, 
        theloai.theloai, 
        casi.tencs, 
        baihat.mota, 
        baihat.luotthich
    FROM 
        baihat
    LEFT JOIN 
        theloai ON baihat.id_tl = theloai.id
    LEFT JOIN 
        casi ON baihat.id_cs = casi.id;`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

BaiHat.update = (newBaiHat, result) => {
  sql.query(
    `UPDATE baihat SET poster = ?, tenbh = ?, id_tl = ?, id_cs = ? , mota = ? WHERE id = ?`,
    [
      newBaiHat.poster,
      newBaiHat.tenbh,
      newBaiHat.id_tl,
      newBaiHat.id_cs,
      newBaiHat.mota,
      newBaiHat.id,
    ],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...newBaiHat });
    }
  );
};

BaiHat.delete = (id, result) => {
  sql.query(`DELETE FROM baihat WHERE id = ?`, id, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

BaiHat.findById = (id, result) => {
  sql.query(`SELECT * FROM baihat WHERE id = '${id}'`, (err, res) => {
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

BaiHat.getBXH = (id, result) => {
  sql.query(
    `SELECT 
        baihat.id, 
        baihat.poster, 
        baihat.tenbh,
        baihat.nhac,
        casi.tencs,
        luotthichbaihat.id AS luotthichbaihat
    FROM 
        baihat
    LEFT JOIN 
        casi ON baihat.id_cs = casi.id
    LEFT JOIN 
        luotthichbaihat ON baihat.id = luotthichbaihat.id_bh AND luotthichbaihat.id_tk = ${id}
    ORDER BY 
        baihat.luotthich DESC
    LIMIT 8;`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

BaiHat.getNew = (id, result) => {
  sql.query(
    `SELECT 
        baihat.id, 
        baihat.poster, 
        baihat.tenbh,
        baihat.nhac,
        casi.tencs,
        luotthichbaihat.id AS luotthichbaihat
    FROM 
        baihat
    LEFT JOIN 
        casi ON baihat.id_cs = casi.id
    LEFT JOIN 
        luotthichbaihat ON baihat.id = luotthichbaihat.id_bh AND luotthichbaihat.id_tk = ${id}
    ORDER BY 
        baihat.thoigiantao DESC
    LIMIT 8;`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

BaiHat.getPhoBien = (id, result) => {
  sql.query(
    `SELECT 
        baihat.id, 
        baihat.poster, 
        baihat.tenbh,
        baihat.nhac,
        casi.tencs,
        luotthichbaihat.id AS luotthichbaihat
    FROM 
        baihat
    LEFT JOIN 
        casi ON baihat.id_cs = casi.id
    LEFT JOIN 
        luotthichbaihat ON baihat.id = luotthichbaihat.id_bh AND luotthichbaihat.id_tk = ${id}
    ORDER BY 
        baihat.thoigiantao ASC`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

BaiHat.findLike = (idBH, idTK, result) => {
  sql.query(
    `SELECT * FROM luotthichbaihat WHERE id_bh = '${idBH}' AND id_tk = '${idTK}'`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      // console.log(res);
      // return;
      // if (res != []) {
      //   result(null, res[0]);
      //   return;
      // }
      result(null, res);
    }
  );
};

BaiHat.unLike = (id, result) => {
  sql.query(`DELETE FROM luotthichbaihat WHERE id = ?`, id, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

BaiHat.like = (idBH, idTK, result) => {
  sql.query(
    "INSERT INTO luotthichbaihat (`id_bh`, `id_tk`) VALUES (?, ?)",
    [idBH, idTK],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, null);
    }
  );
};

BaiHat.getBHCS = (idcs, id, result) => {
  sql.query(
    `SELECT 
        baihat.id, 
        baihat.poster, 
        baihat.tenbh,
        baihat.nhac,
        casi.tencs,
        luotthichbaihat.id AS luotthichbaihat
    FROM 
        baihat
    LEFT JOIN 
        casi ON baihat.id_cs = casi.id
    LEFT JOIN 
        luotthichbaihat ON baihat.id = luotthichbaihat.id_bh AND luotthichbaihat.id_tk = ${id}
    WHERE
        casi.id = ${idcs}
    ORDER BY 
        baihat.luotthich DESC`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

module.exports = BaiHat;
