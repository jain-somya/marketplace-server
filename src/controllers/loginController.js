async function checkLoggedOut(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

async function checkLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).send("Login to access");
  }
  next();
}

async function postLogout(req, res) {
  req.session.destroy(function (e) {
    return res.redirect("/auth/login");
  });
}
export default { checkLoggedIn, checkLoggedOut, postLogout };
