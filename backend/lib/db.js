import mongoose from "mongoose"

export const connectDB = async ()=>{
   try {
    const connect = await  mongoose.connect(process.env.MONGOOSE_URI)
    console.log("MongoDB connected..."  )
   } catch (error) {    
    console.log("MongoDB error" , error)
   }
}