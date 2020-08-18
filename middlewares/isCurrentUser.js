//Check if the user that is accessing userId parameter is current user or not

function isCurrentUser(req, res, next) {
  if (req.user._id.toString() != req.profile._id.toString()) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
}
module.exports = isCurrentUser;
