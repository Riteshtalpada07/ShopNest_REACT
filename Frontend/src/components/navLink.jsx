import { UserRound, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const NavLink = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    toast.success("Logout successfully...!!")
    
  };

  return (
    <div className="flex items-center justify-end gap-2 sm:gap-4">
      <div className="flex items-center">
        <UserRound color="#00b3ff" size={20} />

        {user ? (
          <>
            <span className="ml-1 text-sky-500 hidden sm:inline">
              {user.username}
            </span>

            <p className="mx-2 hidden sm:block">|</p>

            <button
              onClick={handleLogout}
              className="ml-1 text-sm sm:text-base transition-all duration-300 hover:text-red-500 active:scale-95"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              className="ml-1 text-sm sm:text-base transition-all duration-300 hover:text-sky-500 active:scale-95"
              to="/register"
            >
              Sign Up
            </Link>

            <p className="mx-1">/</p>

            <Link
              className="text-sm sm:text-base transition-all duration-300 hover:text-sky-500 active:scale-95"
              to="/login"
            >
              Sign In
            </Link>
          </>
        )}
      </div>

      <p className="hidden sm:block text-xl">|</p>

      <div className="flex items-center">
        <ShoppingCart color="#00b3ff" size={20} />

        <Link
          className="ml-1 text-sm sm:text-base transition-all duration-300 hover:text-sky-500 active:scale-90"
          to="/cart"
        >
          Cart
        </Link>
      </div>
    </div>
  );
};

export default NavLink;