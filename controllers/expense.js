const Expense = require('../models/expense');

exports.getExpense = async (req, res, next) => {
   try{
    const check = req.user.ispremiumuser
    const data = await req.user.getExpenses()
    //console.log(data)
    
    res.status(200).json({allExpense: data , check})
}catch(err){
    console.log(err)
}
}
exports.postExpense = async (req, res, next) => {
    try{const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    //const expense = await Expense.create({amount: amount,description: description, category: category,userId:req.user.id})
    const expense = await req.user.createExpense({
        amount: amount,
        description: description,
        category: category
    })
    res.status(200).json({expenseDetail: expense})

}catch(err){
    console.log(err)
}

}
exports.deleteExpense = async(req, res, next) => {
    try {const id = req.params.expenseId
        const expense = await Expense.findByPk(id);
        expense.destroy({where:{userId:req.user.id}});
        res.status(200).json({message: "deleted successfully"})
        }
        catch(err){console.log(err)
        res.status(500).json("something went wrong")};
}