import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalCategories: 0,
  });

  const [latestProducts, setLatestProducts] = useState([]);

  const getDashboardData = async () => {
    try {
      const res = await axios.get(
        "/api/admin/stats"
      );

      setStats(res.data.stats);
      setLatestProducts(res.data.latestProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="min-h-screen pt-12 sm:pt-10 lg:pt-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          Welcome back, Admin 👋
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-500">Total Users</p>
              <h2 className="text-3xl font-bold text-slate-800">
                {stats.totalUsers}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
              <i className="ri-user-3-line text-2xl text-green-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-500">Categories</p>
              <h2 className="text-3xl font-bold text-slate-800">
                {stats.totalCategories}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
              <i className="ri-apps-2-line text-2xl text-blue-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-orange-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-500">Products</p>
              <h2 className="text-3xl font-bold text-slate-800">
                {stats.totalProducts}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center">
              <i className="ri-shopping-bag-3-line text-2xl text-orange-600"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Products */}
      <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-slate-700 mb-5">
          Latest Products
        </h2>

        <div className="space-y-4">
          {latestProducts.map((product) => (
            <div
              key={product._id}
              className="flex justify-between items-center p-4 bg-slate-50 rounded-xl"
            >
              <div>
                <h3 className="font-semibold">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-500">
                  {product.category?.name}
                </p>
              </div>

              <span className="font-semibold text-green-600">
                ₹{product.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;