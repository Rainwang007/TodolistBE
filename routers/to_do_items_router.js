const express = require('express');
const router = express.Router();
const toDoItemController = require('../controllers/to_do_items_controller');
const authMiddleware = require('../middlewares/auth_middleware');

router.get("/", toDoItemController.getOpenTasks);  //http://localhost:3000/api/toDoItems/
router.get('/createdBy/:userId', toDoItemController.getCreatedByUser); //http://localhost:3000/api/toDoItems/createdBy/:userId
router.get('/assignedTo/:userId', authMiddleware, toDoItemController.getAssignedToUser); //http://localhost:3000/api/toDoItems/assignedTo/:userId
// router.get('/myToDoItems', authMiddleware, toDoItemController.getToDoItems); //http://localhost:3000/api/toDoItems/myToDoItems/
router.get('/:itemId', authMiddleware, toDoItemController.getItemDetail); //http://localhost:3000/api/toDoItems/ +item ID
router.post('/', authMiddleware, toDoItemController.createToDoItem); //http://localhost:3000/api/toDoItems/
router.patch('/:itemId', authMiddleware, toDoItemController.updateToDoItem); //http://localhost:3000/api/toDoItems/ + item ID
router.delete('/:itemId', authMiddleware, toDoItemController.deleteToDoItems); //http://localhost:3000/api/toDoItems/ + itemID



module.exports = router;