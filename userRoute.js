const express = require("express");
const {
  fetchAllUsers,
  getUserById,
  updateUser,
  fetchSingleUser,
  addUser,
  removeUser,
} = require("./userController");
const router = express.Router();
const jwt = require("jsonwebtoken")

router.param("id", getUserById);

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]
  if (token == null) {
    return res.status(401).json({
      error: "Authentication failed!"
    })
  }

  jwt.verify(token, "SecretPrivateKey", (error, user) => {
    if (error) {
      return res.status(403).json({
        error: "Unauthorized accessed!"
      })
    }
    req.user = user
    next()
  })
} 


router.post('/login', (req, res) => {
  const user = { username: "Admin" }
  const accessToken = jwt.sign(user, "SecretPrivateKey") 
  res.json({
    accessToken: accessToken
  })
})

router.get("/users", authenticateToken, fetchAllUsers);
router.get("/users/:id", authenticateToken, fetchSingleUser);
router.post("/users", authenticateToken, addUser);
router.put("/users/:id", authenticateToken, updateUser);
router.delete("/users/:id", authenticateToken, removeUser)

module.exports = router;
