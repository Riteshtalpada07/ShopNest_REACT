import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import axios from "axios";

const Category = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "/api/category"
      );

      setCategories(response.data.category);

      // Select first category by default
      if (
        response.data.category.length > 0 &&
        !selectedCategory
      ) {
        setSelectedCategory(response.data.category[0]._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="w-full py-4 px-3 sm:px-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-700">
          Shop From <span className="text-sky-500">Top Categories</span>
        </h2>

        <button className="flex items-center gap-1 text-xs sm:text-sm text-slate-500 hover:text-sky-500">
          View All
          <ArrowRight color="#00b3ff" size={18} />
        </button>
      </div>

      <hr className="my-5 border-slate-300" />

      <div className="overflow-x-auto no-scrollbar">
        <div className="flex min-w-max gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {categories.map((item) => (
            <div
              key={item._id}
              onClick={() => setSelectedCategory(item._id)}
              className="flex flex-col items-center cursor-pointer shrink-0"
            >
              <div
                className={`
                  w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28
                  rounded-full overflow-hidden border-2 md:border-[3px]
                  transition-all duration-300
                  ${
                    selectedCategory === item._id
                      ? "border-sky-500"
                      : "border-slate-200"
                  }
                `}
              >
                <img
                  className="w-full h-full object-cover"
                  src={item.imageUrl.replace(
                    "/upload/",
                    "/upload/w_200,h_200,c_fill,q_auto,f_auto/"
                  )}
                  alt={item.name}
                />
              </div>

              <h2 className="mt-2 text-xs sm:text-sm md:text-base text-slate-600 text-center">
                {item.name.charAt(0).toUpperCase() +
                  item.name.slice(1)}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;