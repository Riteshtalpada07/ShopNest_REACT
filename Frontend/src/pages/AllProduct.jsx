import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'

const AllProduct = ({addCart}) => {
  const [products, setProducts] = useState([]);

  const getAll = async () => {
    try {
      const res = await axios.get("/api/product");
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="w-full pt-5 px-3 sm:px-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-700">
          All <span className="text-sky-500">Products</span>
        </h2>
        
      </div>

      <hr className=" border-slate-300" />

      <div className=" card w-full overflow-x-auto pb-4">
        <div className="flex gap-5  mt-5">
          {products.map((product) => (
             <div
              key={product._id}
              className="w-[290px] bg-white rounded-2xl shadow-lg overflow-hidden flex-shrink-0 hover:-translate-y-1 transition-all duration-200"
            >
              <Link to={`/product/${product._id}`}>
                <div className="relative group cursor-pointer">
                  <div className="absolute top-0 right-0 px-3 py-2 bg-sky-500 text-white font-semibold rounded-bl-xl rounded-tr-xl z-20">
                    20%
                  </div>

                  {/* Fixed Image Container */}
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-70 backdrop-blur-sm bg-white transition-all duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold bg-black/60 px-4 py-2 rounded-lg">
                      View Product
                    </span>
                  </div>
                </div>
              </Link>

              <div className="p-4 flex flex-col h-[140px]">
                <h2 className="text-lg font-bold line-clamp-1">
                  {product.name}
                </h2>

                <p className="text-gray-600 line-clamp-1">
                  {product.category?.name}
                </p>

                <div className="mt-auto flex justify-between items-center">
                  <span className="text-green-600 font-bold">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>

                  <button
                    onClick={() => addCart(product._id)}
                    className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AllProduct;