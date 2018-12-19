var auth = {};

auth.restrict = function (req, res, next) {
  if (req.session.admin) {
    next();
  } else {
    res.redirect('/login');
  }
}

auth.onlyAdmins = function (req, res, next) {
  console.log("only admin");
  if (req.session.user) {
    if (req.params.id == req.session.user.id) {
      next();
    } else {
      res.redirect(`/users/${req.session.user.id}`)
    }
  } else {
    res.redirect('/login');
  }
}


auth.hideMethods = function (req, res, next) {
  console.log("auth.hideMethods");
  console.log("req.session.user", req.session.user);
  if (req.session.user) {
    res.locals.methods = true;
  } else {
    res.locals.methods = false;
  }
  next();
}


module.exports = auth;