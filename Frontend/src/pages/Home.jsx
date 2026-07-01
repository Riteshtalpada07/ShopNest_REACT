import { useState } from "react";
import Category from "./Category";
import AllProduct from "./AllProduct";
import CategoryProducts from "./CategoryProducts";
import Hero from "./Hero";

const Home = ({ addCart }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="min-h-screen w-full bg-slate-200 pt-20 px-30 max-lg:px-5">
      <Hero />
      <AllProduct addCart={addCart} />
      <Category
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <CategoryProducts
        selectedCategory={selectedCategory}
        addCart={addCart}
      />

      
    </div>
  );
};

export default Home;