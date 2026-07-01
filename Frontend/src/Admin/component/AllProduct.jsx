import { Trash2, SquarePen } from "lucide-react";

const AllProduct = ({
  products,
  setSelectedProduct,
  deleteProduct,
}) => {
  return (
    <div className="w-full lg:w-3/5">
      <div className="w-full p-4">
        <h3 className="font-semibold text-xl mb-4 text-slate-700">
          All Products
        </h3>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Desktop Header */}
          <div className="hidden lg:grid grid-cols-6 px-6 py-4 border-b font-semibold text-slate-700 bg-slate-50">
            <p>Image</p>
            <p>Name</p>
            <p>Price</p>
            <p>Stock</p>
            <p>Category</p>
            <p>Action</p>
          </div>

          <div className="max-h-[530px] overflow-y-auto">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product._id}
                  className="border-b border-slate-200 p-4 lg:p-0"
                >
                  {/* Mobile View */}
                  <div className="lg:hidden flex flex-col gap-3">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover border"
                      />

                      <div>
                        <h4 className="font-semibold text-slate-700">
                          {product.name}
                        </h4>
                        <p className="text-sm text-slate-500">
                          {product.category?.name}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>₹{product.price}</span>
                      <span>Stock: {product.stock}</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setSelectedProduct(product)
                        }
                        className="bg-green-600 text-white p-2 rounded-full hover:bg-green-500 transition"
                      >
                        <SquarePen size={18} />
                      </button>

                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this product?"
                            )
                          ) {
                            deleteProduct(product._id);
                          }
                        }}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-400 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Desktop View */}
                  <div className="hidden lg:grid grid-cols-6 items-center px-6 py-4">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-14 h-14 rounded-lg object-cover border"
                    />

                    <p className="font-medium">{product.name}</p>

                    <p>₹{product.price}</p>

                    <p>{product.stock}</p>

                    <p>{product.category?.name}</p>

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setSelectedProduct(product)
                        }
                        className="bg-green-600 text-white p-2 rounded-full hover:bg-green-500 transition active:scale-90"
                      >
                        <SquarePen size={18} />
                      </button>

                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this product?"
                            )
                          ) {
                            deleteProduct(product._id);
                          }
                        }}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-400 transition active:scale-90"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-slate-500">
                No products found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;