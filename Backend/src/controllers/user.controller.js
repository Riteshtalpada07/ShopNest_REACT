import userModel from "../models/user.model.js";
import crypto from 'crypto'
import config from "../config/config.js";
import jwt from 'jsonwebtoken'


export async function register(req, res) {
    try {
        const { username, email, password, role, address, phone } = req.body;

        const existingUser = await userModel.findOne({ email });
        if(role == "admin"){
            if (await userModel.findOne({role:"admin"})){
                return res.status(400).json({
                    success: false,
                    message: "You are not authorized...!!"
                });
            }
        }

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }


      const hashPass = crypto.createHash("sha256").update(password).digest("hex");

        

        const user = await userModel.create({
            username,
            email,
            password:hashPass,
            role,
            address,
            phone,
        });

        res.status(201).json({
            success: true,
            message: "Registration successful",
            user,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export async function login(req,res) {

    const {email,password,role} = req.body;

    const hashPass = crypto.createHash("sha256").update(password).digest("hex");

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(400).json({
            message: "Email not verified..!!"
        })
    }

    const isValidPass = hashPass === user.password;

    if (!isValidPass) {
        return res.status(401).json({
            message: "Invalid email or password"
        })
    }

    const accessToken = jwt.sign({
        id:user._id,
        role:user.role
    },config.JWT_SECRET,{
        expiresIn:"7d"
    })

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
    });

    
    res.status(200).json({
        message: "Welcome back!",
        user: {
            username: user.username,
            email: user.email,
            role:user.role,
            id:user._id
        },
        accessToken
    })
    
}

export async function getMe(req,res) {
    try {
        const user = await userModel.findById(req.user.id);

        if (!user) {
           res.status(400).json({
            message:"User not found"
           })
        }

           res.status(200).json({
            success:true,
            user
           })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
        
    }
}

export async function logout(req,res) {
    const accessToken = req.cookies.accessToken;

    if(!accessToken){
        return res.status(400).json({
            message:"Token not found"
        })
    }
   
    res.clearCookie("accessToken");

    return res.status(200).json({
        message:"Logged out successfuly..."
    })

}