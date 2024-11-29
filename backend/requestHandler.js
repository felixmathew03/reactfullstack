import todoSchema from "./models/todo.model.js";

export async function addTodo(req,res){
    try{
        const{...todo}=req.body;
        const data=await todoSchema.create({...todo});
        return res.status(201).send({msg:"successfuly added"})
    }catch(error){
        res.status(404).send({msg:"error"})
    }
}

export async function getTodos(req,res) {
    try {
        const todos=await todoSchema.find();
        console.log(todos);
        res.status(200).send(todos)
    } catch (error) {
        res.status(404).send({msg:"error"})
    }
}

export async function deleteTodo(req,res) {
    try {
         const {_id}=req.params;
        const data=await todoSchema.deleteOne({_id})
        res.status(201).send(data);
    } catch (error) {
        res.status(404).send(error)
    }   
}
