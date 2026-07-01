import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Category is required"],
        unique: true,
        trim: true,
    },
    imageUrl:{
        type:String,
        required:[true,"Image url is required"]
    }
},{
    timestamps:true
})

const categoryModel = mongoose.model("category",categorySchema);

export default categoryModel;