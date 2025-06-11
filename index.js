import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import db from "./utils/db.js"

const app = express()
dotenv.config()

// import all routes 


import userRoutes from "./routes/User.routes.js"

const port = process.env.PORT || 4000 ;

app.use(cors({
    origin: process.env.BASE_URL,
    credentials:true, 
    methods:['GET','POST','DELETE','OPTIONS'],
    allowedHeaders:['Content-Type', 'Authorization']
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))



// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.get("/anil",(req,res)=>{

//     res.send("Hello Anil!")
// })

// app.get("/varsha",(req , res)=>{
//     res.send("Hello Varsha!")
// })

// app.get("/lallu",(req,res)=>{
//     res.send("Hello Lallu")
// })

// connect to db

db();

// user routes
app.use("/api/v1/users", userRoutes);





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
