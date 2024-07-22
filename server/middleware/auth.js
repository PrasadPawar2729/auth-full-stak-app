const jwt = require('jsonwebtoken')
//we can checking the req.role
// const {usermodel} = require('../model/user.model')


const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1]
 if(token){

jwt.verify(token,'auth-full-stack',async(err,decoded)=>{
    if(decoded){
        
        req.user=decoded
        // const {userID} =decoded;
        // //we find the user by id inside the userModel
        // //in the user we get the all the info about the user
        // //it find it comes username,email,pass,role
        // const user = await usermodel.findOne({_id:userID})
        // //we want only the role that reason we store the role
        // const requiredRole = user.role;
        // //inside the req.role we store required role
        // //this req.role we can use the access middleware
        //   //we can use the req.role inside the access middleware
        // req.role = requiredRole;
      
        next()
    }
    else{
        res.json({err})
    }
})

 }

 else{
    res.json({msg:'please login !'})
 }
    

}

module.exports={auth}