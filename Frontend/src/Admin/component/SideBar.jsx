import { useState } from "react";
import {
  LayoutGrid,
  UserRound,
  Package,
  Menu,
  X,
} from "lucide-react";
import Nav from "./nav";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const SideBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await axios.get("/api/auth/logout");
    localStorage.removeItem("user");
    toast.success("Logout Successfully..!!");
    navigate("/");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen bg-white flex flex-col shadow-lg z-50
          w-64 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:w-64
        `}
      >
        {/* Close Button Mobile */}
        <div className="lg:hidden flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <Nav />

        {/* Header */}
        <div className="flex py-5 px-5 items-center">
          <Link to="/admin" className="flex items-center">
            <UserRound
              strokeWidth={2.25}
              color="#00b3ff"
              size={25}
            />
            <h2 className="font-bold text-lg text-sky-500 pl-2">
              Admin Dashboard
            </h2>
          </Link>
        </div>

        {/* Menu */}
        <div className="flex-1">
          <div className="hover:bg-sky-100 transition px-5 py-3 font-semibold">
            <Link
              to="/admin/category"
              className="flex items-center gap-2 text-slate-700"
              onClick={() => setIsOpen(false)}
            >
              <LayoutGrid color="#00b3ff" />
              Categories
            </Link>
          </div>

          <div className="hover:bg-sky-100 transition px-5 py-3 font-semibold">
            <Link
              to="/admin/product"
              className="flex items-center gap-2 text-slate-700"
              onClick={() => setIsOpen(false)}
            >
              <Package color="#00b3ff" />
              Products
            </Link>
          </div>
        </div>

        {/* Logout */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleLogout}
            className="text-sky-500 px-5 py-2 font-semibold hover:bg-slate-100 rounded-2xl hover:text-red-400 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;