exports.loggedin = (req, res, next) => {
  if (req.session.loggedin) {
    res.locals.tk = req.session.tk;
    next();
  } else {
    res.redirect("/dangnhap");
  }
};

exports.isAuth = (req, res, next) => {
  if (req.session.loggedin) {
    res.locals.tk = req.session.tk;
    res.redirect("/trangchu");
  } else {
    next();
  }
};

exports.isAdmin = (req, res, next) => {
  if (
    req.session.loggedin &&
    req.session.tk &&
    req.session.tk.quyen === "Admin"
  ) {
    res.locals.tk = req.session.tk;
    next();
  } else {
    res.redirect("/trangchu");
  }
};
