import express  from "express";
import {createTodo, getAllTodo, getTodoById, editTodo, deleteTodo} from '../controller/todoController'

const router = express.Router()

router.get('/todos', getAllTodo)
router.get('/todo/:id', getTodoById)

router.post('/add', createTodo);
router.patch('/edit/:id', editTodo);
router.delete('/delete/:id', deleteTodo);




export default router