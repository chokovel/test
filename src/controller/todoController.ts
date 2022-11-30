import {Request, Response, NextFunction} from 'express'
import Todo from '../model/todo'

export const createTodo = async(req:Request, res:Response)=>{
    try{
        const check = await Todo.findOne({name:req.body.name})
        // console.log(check)
        if(!check){
                const todos = new Todo({
                name: req.body.name,
                description: req.body.description,
                status: req.body.status
            })
            const saved = await todos.save()
            if(saved){
                return res.status(200).json({
                    message: "Todo created successfully",
                    saved
                })
            }else {
                return res.status(400).json({
                    message: "Failed, Error saving todo"
                })
            }
        }else{
            return res.status(400).json({
                message:"Todo already exists"
            })
        }
      
    }catch(error){
            res.status(500).json({
            Error: "internal server error",
            route:"/add"
        })

    }
}

export const getAllTodo = async(req:Request, res:Response)=>{
    try {
        const allTodos = await Todo.find()
        if(allTodos){
            return res.status(200).json({
                message: "Todos retrieved successfully",
                allTodos
            })
        }else {
            return res.status(400).json({
                message: "Failed, Error retrieving todos"
            })
        }
    } catch (error) {
        res.status(500).json({
            Error: "internal server error",
            route:"/todos"
        })
    }
}

export const getTodoById = async(req:Request, res:Response)=>{
    try {
        const id = req.params.id
        const todo = await Todo.findById(id)
        return res.status(200).json({
            todo
        })
    } catch (error) {
            res.status(500).json({
            Error: "Internal server error",
            route: "/todo/:id"
        });
    }
}

export const editTodo = async(req:Request, res:Response)=>{
    const id = req.params.id
    
    const edit = {
        name:req.body.name,
        description: req.body.description,
        status: req.body.status
    }
    const edited = await Todo.findByIdAndUpdate(id, {$set: edit})
    if(edited){
        return res.status(200).json({
            message: "Todo edited successfully"
        })
    }else{
        return res.status(400).json({
            message: "failed to save edit"
        })
    }
}

export const deleteTodo = async(req:Request, res:Response)=>{
    const id = req.params.id as string
    const deleted = await Todo.findOneAndRemove({id})
    if(deleted){
        return res.status(200).json({
            message: "To-do deleted successfully"
        })
    }else{
        return res.status(400).json({
            message: "Your to-do failed to saved"
        })
    }
}

