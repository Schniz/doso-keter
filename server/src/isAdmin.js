const { USERNAME, PASSWORD } = process.env;

module.exports = (req, res, next) => {
  const { username, password } = req.body;
  if (username !== USERNAME || password !== PASSWORD) {
    return res.status(403).send({ error: "UNAUTHORIZED" });
  }
  next();
};
