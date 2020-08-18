function isAdmin(req, res, next) {
  if (req.user.role != 1)
    return res.status(403).json({ error: "You are not admin" });
  next();
}
module.exports = isAdmin;
