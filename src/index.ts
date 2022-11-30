import express, {Request, Response, NextFunction} from 'express'
import logger from 'morgan'
import router from './routes/todo';
import mongoose from 'mongoose';
import dotenv from 'dotenv'


dotenv.config()

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use('/', router);

// app.get('/', (req, res) =>{
//     res.send('Hello World')
// })
mongoose.connect(process.env.DATABASE_URL!, ()=>{

    console.log("Database connected");

})


const port = 3030;

app.listen(port, () =>{
    console.log(`Server is listening to port http://localhost:${port}`)
})


export default app
