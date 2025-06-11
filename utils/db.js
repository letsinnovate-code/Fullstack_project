import mongoose  from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const db = ()=>{

    mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("connected to DataBase");
        
    })
    .catch(()=>{
        console.log("Error connecting to MongoDB");
        
    })
}

export default db;