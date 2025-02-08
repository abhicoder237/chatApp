import jwt from "jsonwebtoken"

export const generateToken = (userId , res)=>{
   const token = jwt.sign(
    {userId}
     ,
    process.env.JWT_SECRET , {
        expiresIn : "2d"
    }
    )

    res.cookie("jwt" , token ,{
        expires : new Date(Date.now() + 1000*60*60*24),
        httpOnly : true,
        secure : false,
         
    })
}