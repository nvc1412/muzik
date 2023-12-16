const mysql = require("mysql");
const dbConfig = require("../config/db.config");

const conn = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB_NAME,
});
conn.connect((error) => {
  if (error) throw error;
  console.log("Kết nối CSDL thành công!");
});
module.exports = conn;
