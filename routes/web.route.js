const authMiddleware = require("../middlewares/auth.middleware");

module.exports = (app) => {
  var router = require("express").Router();

  // Trang Chủ
  require("./TrangChu.route")(app);

  //  user
  require("./user.route")(app);

  app.use(router);
};
