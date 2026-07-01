import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export const isAuthenticated = async (req,res,next)=>{
     try{

        const token = req.cookies.accessToken;

        if(!token){
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const decode = jwt.verify(token,config.JWT_SECRET);

        req.user = decode;

        next();

     }
     catch(error){
        return res.status(400).json({
            message:"Invalid token..!!"
        })
     } 
}