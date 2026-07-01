import { useEffect, useState } from "react";
import axios from "axios";

const CategoryProducts = ({ selectedCategory, addCart }) => {
  const [products, setProducts] = useState([]);

  const getProductsByCategory = async (categoryId) => {
    try {
      const res = await axios.get(
        `/api/product/category/${categoryId}`
      );

      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      getProductsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  if (!selectedCategory) return null;

  return (
    <div className="w-full py-6 px-3 sm:px-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-700">
          Category <span className="text-sky-500">Products</span>
        </h2>
      </div>

      <hr className="my-5 border-slate-300" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="h-48">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4">
              <h2 className="text-lg font-bold truncate">
                {product.name}
              </h2>

              <p className="text-gray-600">
                {product.category?.name}
              </p>

              <div className="flex justify-between items-center mt-3">
                <span className="text-green-600 font-bold">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>

                <button
                  onClick={() => addCart(product._id)}
                  className="px-3 py-2 bg-sky-500 text-white rounded-lg"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-10 text-slate-500">
          No products found in this category.
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;