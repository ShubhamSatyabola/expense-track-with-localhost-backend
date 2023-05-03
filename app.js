const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const dotenv = require('dotenv');


const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const User = require("./models/user")
const Expense = require("./models/expense")
const Order = require("./models/orders");

const app = express();
dotenv.config();
app.use(cors());


const userRoutes = require('./routes/user')
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');
const forgotpassRoutes = require('./routes/forgotpass');

//db.execute('SELECT * FROM products').then((result)=>console.log(result)).catch(err => console.log(err))

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user',userRoutes);
app.use('/password',forgotpassRoutes);
app.use('/expense',expenseRoutes);
app.use('/purchase',purchaseRoutes);
app.use('/premium', premiumRoutes);


User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync()
.then(result=>{
    app.listen(3000)
    
    //  console.log(result)
})
.catch(err=>console.log(err))

