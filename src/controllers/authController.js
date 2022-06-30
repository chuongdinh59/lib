const authorModel = require("../models/author");

const authorController = {
  async addAuthor(req, res) {
    try {
      console.log(req.body);
      if (req) {
        await authorModel.create(req.body);
        res.status(200).json("ADD SUCCESS");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async getAllAuthors(req, res) {
    try {
      const data = await authorModel.find();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async getAuthor(req, res) {
    try {
      const data = await authorModel
        .find({ _id: req.params.id })
        .populate("books");
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async updateAuthor(req, res) {
    try {
      const author = await authorModel.findById(req.params.id);
      await author.updateOne({ $set: req.body });
      res.status(200).json("updated");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async deleteAuthor(req, res) {
    try {
      const author = await authorModel.findByIdAndDelete(req.params.id);
      if (!author) return res.json("Khong tim thay author");
      return res.status(200).json("updated");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = authorController;
