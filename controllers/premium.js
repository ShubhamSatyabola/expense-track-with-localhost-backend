const User = require('../models/user');



exports.getPremium = async(req,res,next)=>{
    try{
        const user = await User.findAll({where:{ispremiumuser:true}});
        //console.log(user)
        const sort = user.sort((a,b)=>{
            return b.totalexpense - a.totalexpense
        })
        res.status(200).json({sort})
    
    }
    catch(err){
        console.log(err)
    }
}