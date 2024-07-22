const express = require("express")
const userRouter=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { usermodel } = require("../model/user.schema")


userRouter.post("/signup",async(req,res)=>{
    const {username,email,password}=req.body;
  
     
    try{
        bcrypt.hash(password, 5, async(err, hash)=> {
         

          if(err){
               res.status(200).json(err)          }
          else{
            const user = new usermodel({
                username,email,password:hash
            })
            await user.save()
            res.status(200).json({message:'signup successfully',success:true})
          }


        })
    }


catch(err){

res.status(400).json({error:err,success:false})
}

})


//login

userRouter.post('/login',async(req,res)=>{
    //logic
    try {
        const { email, password } = req.body;
        const user = await usermodel.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            "auth-full-stack",
            { expiresIn: '24h' }
        )

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                username: user.username
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }



})




module.exports={userRouter};