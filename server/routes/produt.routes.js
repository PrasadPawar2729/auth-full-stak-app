const express= require("express")

const productRouter=express.Router()


productRouter.get("/",(req,res)=>{
    console.log("user info",req.user)
    res.status(200).json([
        {
            name: "mobile",
            price: 10000
        },
        {
            name: "tv",
            price: 20000
        }
    ])
})

module.exports=productRouter