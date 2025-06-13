import User from "../model/User.model.js";
import crypto from "crypto"
import nodamailer from "nodemailer"
import bcrypt from "bcryptjs";

const registerUser = async (req,res)=>{
    
    // get data
   const {name , email , password}= req.body;

//     //validate

if(!name || !email || !password){
    return res.status(400).json({
        massage:"All fields are required!"
    })
}
    



    //check if user already exists
try {
    // const existingUser = User.findOne({email})

    // if(existingUser){
    //     return res.status(400).json({
    //         message:"User already exists"
    //     })
    // }
 // if not exists create a user in database 
   const user = await User.create({
    name,
    email,
    password
   });

   if(!user){
    return res.status(400).json({
        massage:"User not registered"
    })
   }
  
//  //create a verification token 
// const token = crypto.randomBytes(32).toString("hex")
// console.log(token);


// user.verificationToken = token;
// // save token in database 
// await user.save()

// // send token as an email to user 
// const transporter = nodemailer.createTransport({
//   host: process.env.MAILTRAP_HOST,
//   port: process.env.MAILTRAP_PORT,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: process.env.MAILTRAP_USERNAME,
//     pass:process.env.MAILTRAP_PASSWORD,
//   },
// });


// const mailOptions = {
//     from: process.env.MAILTRAP_SENDEREMAIL,
//     to: user.email,
//     subject: "Verify your account",
//     text: `Please click on the following link:
//     ${process.env.BASE_URL}/api/v1/users/verify${token}`, // plain‑text body
    
//   };

//       await transporter.sendMail(mailOptions)

// send success status to user

res.status(201).json({
    massage:"user registered successfully",
    success:true
});

} catch (error) {
    res.status(400).json({
    massage:"User not registered",
    success:false
});
    
}

   
   
    
    
    

};


// code to verify user by email with token verification

const verifyUser = async (req,res) =>{
    // get verification token from url
    const {token} = req.params
    //validate token
    if(!token){
        return res.status(400).json({
            message:"Invalid Token"
        })
    }
    //find user based on token

 const user =   User.findOne({verificationToken : token})
 
    //if not


    if(!user){
        return res.status(400).json({
            message:"Invalid Token"
        })
    }
    // set isVerified field to true

    user.isVerified = true

    // remove verification token

    user.verificationToken = undefined

    //save 

    await user.save()

    //return response

    res.status(200).json({
        message:"User verified successfully."
    })

}


const userLogin = async (req , res) => {
    const {email, password} = req.body

    if(!email || !password){
       return res.status(400).json({
            message:"Email or Password required!"
        })
    }

    try {
   const user =   await  User.findOne({email})
   if(!user){
    return res.status(400).json({
        message:"Invalid email or password!"
    })
   }

   const isMatch =  await bcrypt.compare(password,user.password)

   if(!isMatch){
    return res.status(400).json({
        message:"invalid credentials"
    })
   }

    } catch (error) {
        
    }
}

export {registerUser , verifyUser}