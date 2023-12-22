module.exports = {
    getIndex: (req,res)=>{
        return res.status(234).send('Welcome to Home Page!');
    },
    getDashBoard: async (req,res)=>{
        try{
            //console.log(req.user._id);
            //console.log(req.user.id);
            /* const usersTodo = await Todo.find({author:req.user.id});
            const usersGoal = await Goal.find({author:req.user.id});
            res.render('dashboard.ejs',{user: req.user, todos: usersTodo, goals: usersGoal}); */
            if(req.user){
                console.log(req.user);
                return res.status(234).send('Welcome to the dashboard page, you succesfully logged in');
            }else{
                return res.status(401).send('Unauthorized access, you need to be logged in');
            }
        } catch (err) {
            console.log(err);
        }
    }
}