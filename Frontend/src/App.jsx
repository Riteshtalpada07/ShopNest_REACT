import { Routes, Route, Outlet } from "react-router-dom";
import AdminDashboard from "./Admin/component/AdminDashboard";
import Navbar from "./pages/navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Card from "./pages/Card";
import { Toaster } from "react-hot-toast";
import Dashbord from "./Admin/dashbord";
import Product from "./Admin/product";
import AdminRoute from "./pages/AdminRoute";
import Category from "./Admin/category";
import ProductDetails from "./pages/ProductDetails";
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "./Admin/component/Footer";

function UserLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <Outlet />
      <Footer/>

    </div>
  );
}

export default function App() {
  const addCart = async (productId,quentity) => {
  try {
    const user = localStorage.getItem("user");
  const userId= JSON.parse(user).id;
  
  const res= await axios.post(
    "/api/card/add",
    {
      user:userId,
      product: productId,
      quentity
    }
  );

  toast.success(res.data.message);
  } catch (error) {
     toast.error(error.response?.data?.message || "Failed to add product...!!");
  }
};

  return (
    <>
   <Toaster
  position="top-right"
  gutter={12}
  containerStyle={{
    top: 80,
    right: 20,
  }}
/>

    <Routes>
      {/* User Routes */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home addCart = { addCart} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Card/>} />
        <Route path="/product/:id" element={<ProductDetails addCart = { addCart} />} />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <Dashbord />
          </AdminRoute>
        }
      >
        <Route path="" element={<AdminDashboard/>}/>
        <Route path="product" element={<Product />} />
        <Route path="category" element={<Category />} />
      </Route>
    </Routes>
    </>

  );
}