import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ShoppingCart, Heart, Star } from "lucide-react";

const ProductDetails = ({addCart}) => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const getProduct = async () => {
    try {
      setProduct(null);

      const res = await axios.get(
        `/api/product/${id}`
      );

      setProduct(res.data.product);
      setSimilarProducts(res.data.similarProducts || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    getProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-2xl font-bold text-slate-700">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-8 pt-20">
      {/* Product Details */}
      <div className="bg-white rounded-3xl shadow-lg p-5 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Product Image */}
          <div>
            <div className="bg-gray-100 rounded-2xl overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <p className="text-sky-500 font-medium mb-2">
              {product.category?.name}
            </p>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    fill="currentColor"
                  />
                ))}
              </div>

              <span className="text-gray-500">
                (4.8 Rating)
              </span>
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <span className="text-3xl md:text-4xl font-bold text-green-600">
                ₹{product.price.toLocaleString("en-IN")}
              </span>

              <span className="line-through text-gray-400 text-lg">
                ₹
                {Math.floor(product.price * 1.2).toLocaleString(
                  "en-IN"
                )}
              </span>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                20% OFF
              </span>
            </div>

            {/* Stock */}
            <div className="mt-5">
              {product.stock > 0 ? (
                <span className="bg-green-100 text-green-700 px-3 py-2 rounded-lg">
                  In Stock ({product.stock})
                </span>
              ) : (
                <span className="bg-red-100 text-red-600 px-3 py-2 rounded-lg">
                  Out Of Stock
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-3">
                Product Description
              </h3>

              <p className="text-gray-600 leading-7">
                {product.description}
              </p>
            </div>

            {/* Quantity */}
            <div className="mt-8">
              <h3 className="font-semibold mb-3">
                Quantity
              </h3>

              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    quantity > 1 &&
                    setQuantity(quantity - 1)
                  }
                  className="w-10 h-10 bg-gray-200 rounded-lg text-xl hover:bg-gray-300"
                >
                  -
                </button>

                <span className="text-xl font-bold">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity(quantity + 1)
                  }
                  className="w-10 h-10 bg-gray-200 rounded-lg text-xl hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <button 
              onClick={()=>addCart(product._id,quantity)}
              className="flex-1 flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-4 rounded-xl font-semibold transition">
                <ShoppingCart size={20} />
                Add To Cart
              </button>

              <button className="flex-1 flex items-center justify-center gap-2 border border-slate-300 px-6 py-4 rounded-xl hover:bg-slate-100 transition">
                <Heart size={20} />
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <div className="mt-16 ">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-slate-800">
          Similar Products
        </h2>

        {similarProducts.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
            No similar products found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {similarProducts.map((item) => (
              <Link
                key={item._id}
                to={`/product/${item._id}`}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />

                  <span className="absolute top-2 right-2 bg-sky-500 text-white text-xs px-2 py-1 rounded-lg">
                    Similar
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold truncate">
                    {item.name}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    {item.category?.name}
                  </p>

                  <div className="flex justify-between items-center mt-3">
                    <span className="text-green-600 font-bold">
                      ₹
                      {item.price.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                    <span className="text-yellow-500 text-sm">
                      ★ 4.8
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;