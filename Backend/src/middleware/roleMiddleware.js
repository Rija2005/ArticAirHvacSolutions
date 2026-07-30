
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user?.role) {
      res.status(403);
      throw new Error("User role is missing");
    }

    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error(`Role '${req.user.role}' is not authorized for this action`);
    }

    next();
  };
};