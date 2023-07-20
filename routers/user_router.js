const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const authMiddleware = require("../middlewares/auth_middleware");

router.get('/info', authMiddleware, userController.getUserInfo);//http://localhost:3000/api/users/info
router.post('/register', userController.register);//http://localhost:3000/api/users/register
router.post('/login', userController.login);//http://localhost:3000/api/users/login
router.patch('/update', authMiddleware, userController.updateUserDetails);//http://localhost:3000/api/users/update
router.get('/tasks', authMiddleware, userController.getUserTasks);//http://localhost:3000/api/users/tasks

module.exports = router;