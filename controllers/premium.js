const User = require('../models/user');
const Expense = require('../models/expense')
const sequelize = require('../util/database');



exports.getPremium = async(req,res,next)=>{
    try{
        const leaderboarduser = await User.findAll({
            attributes:['id', 'name', [sequelize.fn('sum',sequelize.col('expenses.amount')),'totalexpense']],
            include: [
                {
                    model: Expense,
                    attributes: []
                }
            ],
            group:['user.id'],
            order:[['totalexpense','DESC']]
        }
            
        )
        res.status(200).json({leaderboarduser})
    
    }
    catch(err){
        console.log(err)
    }
}