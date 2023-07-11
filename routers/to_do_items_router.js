const express = require('express');
const router = express.Router();
const toDoItemController = require('../controllers/to_do_items_controller');

router.get('/', toDoItemController.getToDoItems);
router.get('/:itemId', toDoItemController.getItemDetail);
router.post('/', toDoItemController.createToDoItem);
router.patch('/:itemId', toDoItemController.updateToDoItem);
router.delete('/:itemId', toDoItemController.deleteToDoItems);

module.exports = router;