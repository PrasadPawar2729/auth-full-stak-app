const mongoose=require("mongoose")


const url=process.env.MONGO_URL;

mongoose.connect(url).then(()=>{
    console.log("Connected to MongoDB")
}).catch((err)=>{
    console.error("Failed to connect to MongoDB",err)
})