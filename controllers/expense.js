const Expense = require('../models/expense');
const sequelize = require('../util/database')

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
    try{
    const t = await sequelize.transaction()
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    //const expense = await Expense.create({amount: amount,description: description, category: category,userId:req.user.id})
    if (amount===undefined || amount.length===0 || description===undefined || description.length===0){
        return res.status(400).json({error:'all fields required'})
    }
    
    const totalExpense = +req.user.totalexpense + +amount
    const expense =  req.user.createExpense({
        amount: amount,
        description: description,
        category: category
    },{transaction: t})
    const promise1 = req.user.update({totalexpense:totalExpense},{transaction:t})
    Promise.all([expense,promise1])
    .then(async (response)=>{
        await t.commit()
        res.status(200).json({expenseDetail: response})
    })
    .catch(async(err)=>{
        await t.rollback()
        console.log(err)
    })
    

}
catch(err){
    await t.rollback()
    console.log(err)
}
   
}
exports.deleteExpense = async(req, res, next) => {
    try {const id = req.params.expenseId

        const t = await sequelize.transaction()
        
        const expense = await Expense.findByPk(id);
        const totalExpense = +req.user.totalexpense - +expense.amount
        const promise1 = req.user.update({totalexpense: totalExpense},{transaction:t})
        const promise2 = expense.destroy({where:{userId:req.user.id},transaction:t});
        Promise.all([promise1,promise2])
        .then(async(response)=>{
            await t.commit()
            res.status(200).json({message: "deleted successfully"})
        })
        .catch(async(err)=>{
            await t.rollback()
            console.log(err)})
        }
        catch(err){
        await t.rollback()
        console.log(err)
        res.status(500).json("something went wrong")};
}