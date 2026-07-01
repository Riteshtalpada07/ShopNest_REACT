import axios from "axios";
import { useState, useEffect } from "react";

const Card = () => {
  const [products, setProducts] = useState([]);

  const getCardData = async () => {
   const user = JSON.parse(localStorage.getItem("user"));
console.log(user);
console.log(user.id);


    const res = await axios.get(
      `/api/card/${user.id}`
    );

    return res.data.data.products;
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCardData();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCart();
  }, []);


  const removeProduct = async (productId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    await axios.delete(
      `/api/card/${user.id}/${productId}`
    );

    setProducts((prevProducts) =>
      prevProducts.filter(
        (item) => item.product._id !== productId
      )
    );
  } catch (error) {
    console.log(error);
  }
};

  const totalItems = products.reduce(
    (total, item) => total + item.quantity,
    0
  );

const totalCost = products.reduce(
  (total, item) => total + item.product.price * item.quantity,
  0
);
  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row px-4 sm:px-8 lg:px-30 pt-18">

  {/* Products Section */}
  <div className="w-full lg:w-4/5 pt-5 px-2 sm:px-6 lg:border-r-1 border-slate-300">
    <div className="flex justify-between items-center mb-5">
      <h2 className="text-lg sm:text-xl font-semibold text-slate-700">
        Cart <span className="text-sky-500">Products</span>
      </h2>
    </div>

    <hr className="my-5 border-slate-300" />

    <div className=" card w-full lg:h-[75vh] overflow-y-auto">
      <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-5">

        {products.map((item) => (
          <div
            key={item.product._id}
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="absolute top-0 right-0 px-3 py-2 bg-sky-500 text-white font-semibold rounded-bl-xl rounded-tr-xl z-10">
              Qty: {item.quantity}
            </div>

            <div className="h-48">
              <img
                className="w-full h-full object-cover"
                src={item.product.imageUrl}
                alt={item.product.name}
              />
            </div>

            <div className="p-4">
              <h2 className="text-lg font-bold truncate">
                {item.product.name}
              </h2>

              <p className="text-gray-600">
                {item.product.category?.name || "Category"}
              </p>

              <div className="flex justify-between items-center mt-3">
                <span className="text-green-600 font-bold">
                  ₹{item.product.price.toLocaleString("en-IN")}
                </span>

               <button
                onClick={() => removeProduct(item.product._id)}
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
              </div>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <div className="col-span-full text-center text-gray-500 text-lg">
            Your cart is empty
          </div>
        )}
      </div>
    </div>
  </div>

  {/* Cart Summary */}
  <div className="w-full lg:w-1/5 pt-8 lg:pt-15 px-4 border-t lg:border-t-0 lg:border-0 border-slate-300 lg:sticky lg:top-20 h-fit">

    <h2 className="text-xl font-semibold text-slate-700 mb-4">
      Cart Summary
    </h2>

    <div className="space-y-3">
      <div className="flex justify-between">
        <span>Total Items</span>
        <span className="font-semibold">{totalItems}</span>
      </div>

      <div className="flex justify-between">
        <span>Total Cost</span>
        <span className="font-semibold text-green-600">
          ₹{totalCost.toLocaleString("en-IN")}
        </span>
      </div>
    </div>

    <button className="w-full mt-6 bg-sky-500 text-white py-3 rounded-lg font-semibold hover:bg-sky-600">
      Checkout
    </button>

  </div>

</div>
  );
};

export default Card;