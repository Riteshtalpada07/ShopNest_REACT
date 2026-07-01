import userModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";

export const getDashboardStats = async (req, res) => {
    try {
        const [totalUsers, totalProducts, totalCategories] =
            await Promise.all([
                userModel.countDocuments(),
                ProductModel.countDocuments(),
                categoryModel.countDocuments(),
            ]);

        const latestProducts = await ProductModel.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("category");

        res.status(200).json({
            success: true,
            stats: {
                totalUsers,
                totalProducts,
                totalCategories,
            },
            latestProducts,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};