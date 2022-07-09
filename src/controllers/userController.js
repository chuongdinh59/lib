const jwt = require("jsonwebtoken");
const handleStatus = require("../utils/handleStatus");
const User = require("../models/userModel");

const userController = {
  async addUser(req, res) {},
  async getAllUser(req, res) {
    try {
      const allUser = await User.find({});
      const results = allUser.map((i) => {
        return {
          id: i._id,
          name: i.name,
          isAdmin: i.isAdmin,
          avatar: i?.avatar,
        };
      });
      handleStatus(1, res, results);
    } catch (error) {
      handleStatus(0, res, error);
    }
  },
  async getUser(req, res) {
    try {
      const user = req.user;
      handleStatus(1, res, {
        id: user.id,
        name: user.name,
        isAdmin: user.isAdmin,
        avatar: user?.avatar,
      });
    } catch (error) {
      console.log(req.headers.token);
      throw error;
    }
  },
  async updateUser(req, res) {},
  async deleteUser(req, res) {},
};

module.exports = userController;
