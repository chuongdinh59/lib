const { findById } = require("../models/author");
const authorModel = require("../models/author");
const book = require("../models/book");
const bookModel = require("../models/book");

const bookController = {
  async addBook(req, res) {
    try {
      const book = new bookModel(req.body);
      const savedBook = await book.save();
      if (req.body.author) {
        const author = await authorModel.findById(req.body.author);
        await author.updateOne({ $push: { books: savedBook._id } });
      }
      return res.status(200).json("success");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async getAllBook(req, res) {
    try {
      const data = await bookModel.find();
      return res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async getABook(req, res) {
    try {
      const book = await bookModel.findById(req.params.id).populate("author");
      return res.status(200).json(book);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async updateBook(req, res) {
    try {
      const book = await bookModel.findById(req.params.id);
      if (!!req.body.author && req.body.author !== book.author) {
        const oldAuthor = await authorModel.findById(book.author);
        const newAuthor = await authorModel.findById(req.body.author);
        if (oldAuthor && newAuthor) {
          await oldAuthor.updateOne({ $pull: { books: book.id } });
          await newAuthor.updateOne({ $push: { books: book.id } });
        } else res.status(403).json("NOT FOUND");
      }
      await book.updateOne({ $set: req.body });
      return res.status(200).json("updated");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async deleteBook(req, res) {
    try {
      await authorModel.updateMany(
        { books: req.params.id },
        { $pull: { books: req.params.id } }
      );
      await bookModel.findByIdAndDelete(req.params.id);
      res.status(200).json("deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = bookController;
