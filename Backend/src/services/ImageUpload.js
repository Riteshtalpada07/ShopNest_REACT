import cloudinary from "../config/cloudinary.js";

const uploadImage = async (imageUrl)=>{
    try {
        const result = await cloudinary.uploader.upload(imageUrl, {
            folder: "ecommerce-products",
        });

        return ({
            public_id: result.public_id,
            url: result.secure_url
        })
    } catch (error) {
        console.error("CLOUDINARY ERROR:", error);
        throw error;
    }
}
        
export default uploadImage;