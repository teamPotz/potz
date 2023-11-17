export function verifyAuth(req, res, next) {
  try {
    if (!req.isAuthenticated()) {
      throw new Error('Not authorized');
    }

    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
}
