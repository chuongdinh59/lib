const authorController = require("../controllers/authController");
const bookController = require("../controllers/bookController");

const router = require("express").Router();

router.post("/author/", authorController.addAuthor);
router.get("/author/", authorController.getAllAuthors);
router.get("/author/:id", authorController.getAuthor);
router.post("/author/update/:id", authorController.updateAuthor);
router.delete("/author/:id", authorController.deleteAuthor);

router.post("/book", bookController.addBook);
router.get("/book/", bookController.getAllBook);
router.get("/book/:id", bookController.getABook);
router.post("/book/update/:id", bookController.updateBook);
router.delete("/book/:id", bookController.deleteBook);
module.exports = router;
