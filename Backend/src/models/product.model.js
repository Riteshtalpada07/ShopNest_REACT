import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
        },

        stock: {
            type: Number,
            required: true,
            default: 0,
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "category",
            required: true,
        },

        imageUrl: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;