const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const authMiddleware = require("../middlewares/auth_middleware");

router.get('/info', authMiddleware, userController.getUserInfo);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.patch('/update', authMiddleware, userController.updateUserDetails);
router.get('/tasks', authMiddleware, userController.getUserTasks);

module.exports = router;