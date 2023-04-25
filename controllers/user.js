const User = require('../models/user');

exports.postSignUp = async (req,res) => {
    try{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        // const user = await User.findAll({where:{email:email}});
        // if(user){
        //     console.log(user)
        //     throw new Error('User already exist')
            
        // }
        const newUser = await User.create({
            name: name,
            email: email,
            password: password
        })
        res.status(201).json({newUser: newUser })
        

     }
    catch(err){
        console.log(err)
    }
}

exports.getSignUp = async (req,res)=>{
    try{const allUsers = await User.findAll();
        res.status(200).json({allUsers: allUsers})

    }
    catch(err){
        console.log(err)
    }
}
