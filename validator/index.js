exports.userSignupValidator = (req, res, next) => {
  req.check("name", "Name is required").notEmpty();
  req
    .check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 32,
    });
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 5 })
    .withMessage("Password must contain at least 5 characters");
  const errors = req.validationErrors();
  if (errors) {
    let errArray = [];
    errors.map((err) => {
      errArray.push(err.msg);
    });
    return res.status(400).json({ error: errArray });
  }
  next();
};
