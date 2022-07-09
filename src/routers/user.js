const userController = require("../controllers/userController");
const verify = require("../middleware/verify");

const router = require("express").Router();

router.get("/", verify.verifyToken, userController.getUser); // GET USER
router.get("/friends", verify.verifyToken, userController.getAllUser); // GET USER
router.post("/"); // ADD USER
router.put("/"); // UPDATE USER
router.delete("/"); // DELETE USER
module.exports = router;
