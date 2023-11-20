export function verifyAuth(req, res, next) {
  try {
    if (!req.isAuthenticated()) {
      throw new Error('Not authorized');
    }

    next();
  } catch (error) {
    next(error);
  }
}
