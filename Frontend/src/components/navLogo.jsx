import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NavLogo = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center cursor-pointer shrink-0"
      onClick={() => navigate("/")}
    >
      <ShoppingBag color="#00b3ff" size={28} className="sm:size-8" />

      <h1 className="ml-2 font-bold text-sky-500 text-xl sm:text-2xl">
        ShopNest
      </h1>
    </div>
  );
};

export default NavLogo;