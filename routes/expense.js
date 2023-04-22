const path = require('path');

const express = require('express');

const expenseController = require('../controllers/expense');

const router = express.Router();

router.get('/get-expense', expenseController.getExpense)

router.post('/post-expense', expenseController.postExpense)

router.delete('/delete-expense/:expenseId', expenseController.deleteExpense)




module.exports = router;