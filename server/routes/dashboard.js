const express = require('express');
const router = express.Router();
const homeController = require('./../controllers/home');
const todoController = require('./../controllers/todo');
const { ensureAuth } = require('./../middleware/auth');
// ensureAuth: means we are checking if the user is logged in. once logged in we can get the Todos. check the middleware file
//before dashboard can be run, we must run ensureAuth

router.get('/', ensureAuth, homeController.getDashBoard);
// todo's routes
router.get('/todo',ensureAuth, todoController.getTodo);
router.post('/posttodo', todoController.postTodo);
router.delete('/:todoId/deleteTodo', todoController.deleteTodo);
router.put('/:todoId/updateTodo', todoController.updateTodo);

module.exports = router;