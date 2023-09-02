export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;

  try {
    const { userId, isAdmin, id } = verifyJWT(token);
    req.user = { userId, isAdmin, id };

    next();
  } catch (error) {
    if (!token) throw new UnauthenticatedError("Authentication Invalid!");
  }
};
