"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_1 = require("../controller/todoController");
const router = express_1.default.Router();
router.get('/todos', todoController_1.getAllTodo);
router.get('/todo/:id', todoController_1.getTodoById);
router.post('/add', todoController_1.createTodo);
router.patch('/edit/:id', todoController_1.editTodo);
router.delete('/delete/:id', todoController_1.deleteTodo);
exports.default = router;
