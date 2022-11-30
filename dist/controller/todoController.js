"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.editTodo = exports.getTodoById = exports.getAllTodo = exports.createTodo = void 0;
const todo_1 = __importDefault(require("../model/todo"));
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield todo_1.default.findOne({ name: req.body.name });
        // console.log(check)
        if (!check) {
            const todos = new todo_1.default({
                name: req.body.name,
                description: req.body.description,
                status: req.body.status
            });
            const saved = yield todos.save();
            if (saved) {
                return res.status(200).json({
                    message: "Todo created successfully",
                    saved
                });
            }
            else {
                return res.status(400).json({
                    message: "Failed, Error saving todo"
                });
            }
        }
        else {
            return res.status(400).json({
                message: "Todo already exists"
            });
        }
    }
    catch (error) {
        res.status(500).json({
            Error: "internal server error",
            route: "/add"
        });
    }
});
exports.createTodo = createTodo;
const getAllTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTodos = yield todo_1.default.find();
        if (allTodos) {
            return res.status(200).json({
                message: "Todos retrieved successfully",
                allTodos
            });
        }
        else {
            return res.status(400).json({
                message: "Failed, Error retrieving todos"
            });
        }
    }
    catch (error) {
        res.status(500).json({
            Error: "internal server error",
            route: "/todos"
        });
    }
});
exports.getAllTodo = getAllTodo;
const getTodoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const todo = yield todo_1.default.findById(id);
        return res.status(200).json({
            todo
        });
    }
    catch (error) {
        res.status(500).json({
            Error: "Internal server error",
            route: "/todo/:id"
        });
    }
});
exports.getTodoById = getTodoById;
const editTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const edit = {
        name: req.body.name,
        description: req.body.description,
        status: req.body.status
    };
    const edited = yield todo_1.default.findByIdAndUpdate(id, { $set: edit });
    if (edited) {
        return res.status(200).json({
            message: "Todo edited successfully"
        });
    }
    else {
        return res.status(400).json({
            message: "failed to save edit"
        });
    }
});
exports.editTodo = editTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const deleted = yield todo_1.default.findOneAndRemove({ id });
    if (deleted) {
        return res.status(200).json({
            message: "To-do deleted successfully"
        });
    }
    else {
        return res.status(400).json({
            message: "Your to-do failed to saved"
        });
    }
});
exports.deleteTodo = deleteTodo;
