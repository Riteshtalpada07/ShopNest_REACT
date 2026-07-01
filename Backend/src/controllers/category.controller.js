import categoryModel from "../models/category.model.js";
import route from "../router/category.router.js";
import uploadImage from "../services/ImageUpload.js";
import ProductModel from "../models/product.model.js";


export const createCategory = async (req,res)=>{
    try {

        let { name,imageUrl } = req.body;
        name = name.toLowerCase();
         
        const isPresent = await categoryModel.findOne({ name });
        
        if (isPresent) {
           return res.status(400).json({
                message: "Category already available"
            })
        }
        console.log("Name:", name);
        console.log("Image URL:", imageUrl);

        const result = await uploadImage(imageUrl);

        console.log("Upload Result:", result);

        const { url } = result;

        const category = categoryModel.create({
            name,
            imageUrl:url
        })
   
       return  res.status(200).json({
            message: "category added successfully..",
            category
        })

        
        
        
    } catch (error) {
        console.log("ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }


}

export const getAll = async (req,res) =>{
    try {

        const category = await categoryModel.find({});

         if(!category){
           return res.status(400).json({
                message:"No category available"
            })
         }

         return  res.status(200).json({
             message: "Category fetched successfully..!",
             category
         })
        
    } catch (error) {
        return res.status(200).json({
            message: error.message,
        });
    }
    
}

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        let { name, imageUrl } = req.body;

        name = name.toLowerCase();

        const currentCategory = await categoryModel.findById(id);

        if (!currentCategory) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        // Check duplicate only if name is changed
        if (currentCategory.name !== name) {
            const existingCategory = await categoryModel.findOne({ name });

            if (existingCategory) {
                return res.status(400).json({
                    message: "Category already exists!"
                });
            }
        }

        const updateData = { name };
        console.log("imageUrl:", imageUrl);

        if (imageUrl) {
            const result = await uploadImage(imageUrl);
            console.log("Upload Result:", result);
            updateData.imageUrl = result.url;
        }

        const category = await categoryModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        return res.status(200).json({
            message: "Category updated successfully",
            category
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await categoryModel.findById(id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found",
            });
        }

        // Delete all products of this category
        await ProductModel.deleteMany({
            category: id,
        });

        // Delete category
        await categoryModel.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Category and all related products deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};