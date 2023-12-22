const Todo = require('./../models/todo');
module.exports = {
    getTodo: async (req,res)=>{
        /* res.render('todo.ejs',{ user: req.user}); */
        try {
            const todos = await Todo.find({ author: req.user.id });
            return res.status(200).json({
                count: todos.length,
                data: todos
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ message: error.message })
        }
    },
    postTodo: async (req, res)=>{
        try {
            if(
                !req.body.todo ||
                !req.body.urgency
            ){
                return res.status(500).send({
                    message: "Send all required fields: todo, urgency"
                })
            }
            const todo = new Todo({
                todo: req.body.todo,
                urgency: req.body.urgency,
                author: req.user._id,
              });
              const result = await todo.save();
              /* res.redirect("/dashboard");  */
              return res.status(201).send(result);   
        } catch (error) {
            console.log(error.message);
            res.status(500).send({message: error.message});
        }
    },
    deleteTodo: async (req, res)=>{
        try{
            const { todoId } = req.params;
            const result = await Todo.findByIdAndDelete(todoId, req.body);
            if (!result){
                return res.status(404).json({
                    message: 'Todo not found'
                });
            }
            return res.status(200).send({message:'Todo Deleted Successfully'});
        }catch(error){
            console.log(error.message);
            res.status(500).send({ message: error.message })
        }
    },
    updateTodo: async (req, res)=>{
        try{
            if(
                !req.body.todo ||
                !req.body.urgency
            ){
                return res.status(400).send({
                    message: "Send all required fields: todo, urgency"
                })
            }
            const { todoId } = req.params;
            const result = await Todo.findByIdAndUpdate(todoId, req.body);
            if (!result){
                return res.status(404).json({
                    message: 'Todo not found'
                });
            }
            return res.status(200).send({message:'Todo Updated Successfully'});
        }catch(error){
            console.log(error.message);
            res.status(500).send({ message: error.message })
        }
    },
}