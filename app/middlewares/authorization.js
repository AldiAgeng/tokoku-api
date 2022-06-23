const jwt = require("jsonwebtoken");
const userServices = require("../services/userServices");
module.exports = {
  async authorize(req, res, next) {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = jwt.verify(token, process.env.JWT_SIGNATURE_KEY);

      req.user = await userServices.find(tokenPayload.id);

      next();
    } catch (error) {
      console.log(error.message);
      res.status(401).json({
        name: "notLogin",
        message: "You are not login/access_token is wrong",
      });
    }
  },
};
