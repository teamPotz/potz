export function verifyAuth(req, res, next) {
  try {
    if (!req.isAuthenticated()) {
      res.status(401);
      throw new Error('Not authorized');
    }

    next();
  } catch (error) {
    next(error);
  }
}
