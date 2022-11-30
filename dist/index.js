"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const todo_1 = __importDefault(require("./routes/todo"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use('/', todo_1.default);
// app.get('/', (req, res) =>{
//     res.send('Hello World')
// })
mongoose_1.default.connect(process.env.DATABASE_URL, () => {
    console.log("Database connected");
});
const port = 3030;
app.listen(port, () => {
    console.log(`Server is listening to port http://localhost:${port}`);
});
exports.default = app;
