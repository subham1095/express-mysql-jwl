const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createUser,
  login,
  getUserByUserId,
   getUsers,
  updateUsers,
  deleteUser,
  createtask,
  gettask1,
  deletetask,
  updatetask
} = require("./user.controller");
router.get("/gettask1", checkToken, gettask1);
router.get("/", checkToken, getUsers);
router.patch("/updatetask", checkToken, updatetask);

router.post("/", checkToken, createUser);
router.get("/:id", checkToken, getUserByUserId);
router.post("/login", login);
router.patch("/", checkToken, updateUsers);
 router.delete("/", checkToken, deleteUser);
router.post("/createtask", checkToken, createtask);

 router.delete("/", checkToken, deletetask);

module.exports = router;
