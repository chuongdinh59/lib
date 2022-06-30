const router = require("express").Router();

router.get("/"); // GET ALL USER
router.get("/:id"); // GET USER
router.post("/"); // ADD USER
router.put("/"); // UPDATE USER
router.delete("/"); // DELETE USER
module.exports = router;
