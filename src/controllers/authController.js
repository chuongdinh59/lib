const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const handleStatus = require("../utils/handleStatus");
const authController = {
  async register(req, res) {
    try {
      const { password } = req.body;
      // Create hashed password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const newUser = new User({ ...req.body, password: hashPassword });
      const savedUser = await newUser.save();
      // End
      handleStatus(1, res, savedUser);
    } catch (error) {
      handleStatus(0, res, error);
    }
  },
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const accessToken = await authController.generateAccessToken(user);
          const refreshToken = await authController.generateAccessToken(user);
          handleStatus(1, res, {
            message: "LOGIN SUCCESS",
            token: {
              accessToken,
              refreshToken,
            },
          });
        } else handleStatus(0, res, "WRONG PASSWORD");
      } else handleStatus(0, res, "USER NOT VALID");
    } catch (error) {
      handleStatus(0, res, error);
    }
  },
  async refreshToken(req, res) {
    const refreshToken = req.headers.refreshToken;
    if (!refreshToken) handleStatus(0, res, "YOU NOT ALLOW");
    try {
      jwt.verify(refreshToken, process.env.KEY_JWT, async (error, user) => {
        if (error) handleStatus(0, res, error);
        const newAccessToken = await authController.generateAccessToken(user);
        handleStatus(0, res, {
          message: "REFRESH TOKEN SUCCESS",
          token: {
            accessToken: newAccessToken,
          },
        });
      });
    } catch (error) {
      handleStatus(0, res, error);
    }
  },
  generateAccessToken(user) {
    const { id, isAdmin } = user;
    return jwt.sign({ id, isAdmin }, process.env.KEY_JWT, {
      expiresIn: "12h",
    });
  },
  generateRefreshToken(user) {
    const { id, isAdmin } = user;
    return jwt.sign({ id, isAdmin }, process.env.KEY_JWT);
  },
};

module.exports = authController;
