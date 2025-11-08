export const generateToken = (user, message, statusCode, req, res) => {
  const token = user.generateJsonWebToken();
  const isSecure = req.secure || req.headers["x-forwarded-proto"] === "https";
  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: isSecure,
      sameSite: isSecure ? "strict" : "lax",
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};

