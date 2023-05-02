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
    const totalExpense = +req.user.totalexpense + +amount
    const expense =  req.user.createExpense({
        amount: amount,
        description: description,
        category: category
    })
    const promise1 = req.user.update({totalexpense:totalExpense})
    Promise.all([expense,promise1])
    .then((response)=>{res.status(200).json({expenseDetail: response})}
        )
    .catch(err=>console.log(err))
    

}catch(err){
    console.log(err)
}

}
exports.deleteExpense = async(req, res, next) => {
    try {const id = req.params.expenseId
        
        const expense = await Expense.findByPk(id);
        const totalExpense = +req.user.totalexpense - +expense.amount
        const promise1 = req.user.update({totalexpense: totalExpense})
        const promise2 = expense.destroy({where:{userId:req.user.id}});
        Promise.all([promise1,promise2])
        .then(res.status(200).json({message: "deleted successfully"}))
        .catch(err=>console.log(err))
        }
        catch(err){console.log(err)
        res.status(500).json("something went wrong")};
}