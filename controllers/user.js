const User = require('../models/user');

exports.postSignUp = async (req,res) => {
    try{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findAll({where:{email:email}});
        if(user.length>0){
            //console.log(user)
           return res.status(500).json({error: "email already exist"})
        }
        const newUser = await User.create({
            name: name,
            email: email,
            password: password
        })
        res.status(201).json({newUser: newUser })
        

     }
    catch(err){
        //console.log(err)
        res.status(500).json({error:err})
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

exports.postLogIn = async (req,res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;



        const user = await User.findAll({where:{email:email}});
        //console.log(user)
        if(user.length>0){
            if(user[0].password === password){
                return res.status(201).json({message: "user logged in sucessfully" })
            }
             else{
               return res.status(401).json({error: "incorrect password" })
             }
            
            
        }
        else{
            res.status(404).json({error:"user not found"})
        }
        
    }
    catch(err){
        res.status(500).json({error:err})
    }
}