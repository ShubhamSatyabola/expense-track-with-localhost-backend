const sendinblue = require('sib-api-v3-sdk');


exports.forgotPassword = async(req,res,next)=>{
    try{
        const email = req.body.email;
        //console.log(email)
        const client =sendinblue.ApiClient.instance

        const apiKey = client.authentications['api-key']
        apiKey.apiKey = process.env.sendinblue_key;
        const tranEmailApi = new sendinblue.TransactionalEmailsApi()

        const sender = {
            email: 'satyabolashubham@gmail.com'
        }
        const receivers = [
            {
                email: email
            }
        ]
        //console.log(sender,receivers)
           
        const reset = await tranEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'reset password',
            textContent: 'reset your password here'
        })
        //console.log(reset)
        //console.log(response)
        res.status(200).json({message:"email sent successfully"})

    }
    catch(err){
        console.log(err)
    }

}