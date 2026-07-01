import ProductModel from "../models/product.model.js";
import crypto from 'crypto'
import config from "../config/config.js";
import jwt from 'jsonwebtoken';
import uploadImage from "../services/ImageUpload.js";
import categoryModel from "../models/category.model.js";
import { log } from "console";

export async function createProduct(req,res) {
    try {
        const { name, description, price, stock, category, imageUrl } = req.body;

        if (!name || !price || !stock || !category || !imageUrl) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const { url } = await uploadImage(imageUrl);

        const product = await ProductModel.create({
            name,
            description,
            price,
            stock,
            category,
            imageUrl: url
        })

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export async function getAll(req, res) {
    try {
        const products = await ProductModel
            .find()
            .populate("category");
        

        return res.status(200).json({
            success: true,
            products
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export async function updateProduct(req, res) {
    try {
        const { id } = req.params;

        const product = await ProductModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export async function deleteProduct(req,res) {
    const {id}= req.params;
    console.log(id);
    await ProductModel.findByIdAndDelete(id);

    res.status(200).json({
        message:"Product deleted successfully..!!"
    })
    
}
export const getSingleProduct = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id)
            .populate("category");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const similarProducts = await ProductModel.find({
            category: product.category._id,
            _id: { $ne: product._id },
        })
            .populate("category")
            .limit(4);

        res.status(200).json({
            success: true,
            product,
            similarProducts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const getProductsByCategory = async (req, res) => {
    try {
        console.log("Category ID:", req.params.id);

        const products = await ProductModel.find({
            category: req.params.id,
        }).populate("category");

        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};