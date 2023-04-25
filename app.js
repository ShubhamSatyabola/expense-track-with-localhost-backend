const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const User = require("./models/user")

const app = express();
app.use(cors());


const userRoutes = require('./routes/user')
const expenseRoutes = require('./routes/expense')

//db.execute('SELECT * FROM products').then((result)=>console.log(result)).catch(err => console.log(err))

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user',userRoutes)
app.use(expenseRoutes);




sequelize.sync()
.then(result=>{
    app.listen(3000)
    
    //  console.log(result)
})
.catch(err=>console.log(err))

