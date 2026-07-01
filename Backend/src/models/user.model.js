import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username must be unique"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "email nust be unique"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]

    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        required: [true, "Role is required"]
    },

    phone: {
        type: Number,
        required: [true, "Phone No. is required"]
    },

    address: {
        type: String,
        required: [true, "Phone No. is required"]
    },
    verified:{
        type:Boolean,
        default:false
    }

})

const userModel = mongoose.model("users",userSchema);

export default userModel;