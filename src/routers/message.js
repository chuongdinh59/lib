const authController = require("../controllers/authController");

const router = require("express").Router();

router.post("/:id", messageController.addMessage); // ADD A MESSAGE TO ROON
router.get("/:id"); // GET ALL MESSAGE FROM A ROOM
router.get("/latest"); // GET LATETES MESSAGE
module.exports = router;
