import CardModel from "../models/card.model.js";

export async function addToCard(req, res) {
    try {
        const { user, product,quentity } = req.body;

        let cart = await CardModel.findOne({ user });

        if (cart) {
            const existingProduct = cart.products.find(
                (item) => item.product?.toString() === product
            );

            if (existingProduct) {
                if(quentity){
                    existingProduct.quantity += quentity;
                }
                else{
                    existingProduct.quantity += 1;
                }
                
            } else {
                cart.products.push({
                    product,
                    quantity: 1,
                });
            }

            await cart.save();
        } else {
            cart = await CardModel.create({
                user,
                products: [
                    {
                        product,
                        quantity: 1,
                    },
                ],
            });
        }

        res.status(200).json({
            success: true,
            message: "Product added to cart",
            cart,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
export async function getCartData(req, res) {
    try {
        const { id } = req.params;
        console.log("Requested User:", id);

        const cart = await CardModel.findOne({ user:id })
        .populate("products.product");

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
            });
        }

        res.status(200).json({
            message: "Cart fetched successfully",
            data: cart,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}