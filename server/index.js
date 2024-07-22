

const express = require('express');
const cors = require("cors")
const { userRouter } = require('./routes/user.routes');
const { auth } = require('./middleware/auth');
const productRouter = require('./routes/produt.routes');
require("dotenv").config()
require("./config/db")
// const userRouter = require('./routes/user.routes');
const app = express();



app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',  // Allow requests from this origin
  }));

app.use("/user",userRouter)
app.use("/product",auth,productRouter)
app.use("/",(req,res)=>{
    res.send('Welcome to my API') 
 });


app.listen(process.env.PORT,()=>{
    try{

        console.log('Server is running on port 1991');
    }
    catch(err){
        console.log('Error starting server',err);
    }
})