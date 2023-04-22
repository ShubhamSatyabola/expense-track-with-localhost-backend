const Expense = require('../models/expense');

exports.getExpense = async (req, res, next) => {
   try{
    const data = await Expense.findAll()
    res.status(200).json({allExpense: data})
}catch(err){
    console.log(err)
}
}
exports.postExpense = async (req, res, next) => {
    try{const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    const expense = await Expense.create({
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
        expense.destroy();
        console.log('Destroyed Project')
        }
        catch(err){console.log(err)};
}