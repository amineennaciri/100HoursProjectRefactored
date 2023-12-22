const Goal = require('./../models/goal');

module.exports = {
    getGoal: async (req,res)=>{
        /* res.render('goal.ejs',{ user: req.user}); */
        try {
            if(req.user){
            const goals = await Goal.find({ author: req.user.id });
            return res.status(200).json({
                count: goals.length,
                data: goals
            });
            }else{
                return res.status(401).send('Unauthorized access, you need to be logged in');
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ message: error.message })
        }
    },
    postGoal: async (req, res, next)=>{
        try {
            if(
                !req.body.goal ||
                !req.body.schedule
            ){
                return res.status(500).send({
                    message: "Send all required fields: goal, schedule"
                })
            }
            const goal = new Goal({
                goal: req.body.goal,
                schedule: req.body.schedule,
                author: req.user._id,
              });
              const result = await goal.save();
              /* res.redirect("/dashboard");  */
              return res.status(201).send(result);   
        } catch (error) {
            console.log(error.message);
            res.status(500).send({message: error.message});
        }
    },
    deleteGoal: async (req, res, next)=>{
        try{
            const { goalId } = req.params;
            const result = await Goal.findByIdAndDelete(goalId, req.body);
            if (!result){
                return res.status(404).json({
                    message: 'Goal not found'
                });
            }
            return res.status(200).send({message:'Goal Deleted Successfully'});
        }catch(error){
            console.log(error.message);
            res.status(500).send({ message: error.message })
        }
    },
    updateGoal: async (req, res, next)=>{
        try{
            if(
                !req.body.goal ||
                !req.body.schedule
            ){
                return res.status(400).send({
                    message: "Send all required fields: goal, schedule"
                })
            }
            const { goalId } = req.params;
            const result = await Goal.findByIdAndUpdate(goalId, req.body);
            if (!result){
                return res.status(404).json({
                    message: 'Goal not found'
                });
            }
            return res.status(200).send({message:'Goal Updated Successfully'});
        }catch(error){
            console.log(error.message);
            res.status(500).send({ message: error.message })
        }
    },
}