import { useState, useEffect } from "react";
import AddCategory from "./component/AddCategory";
import AllCategory from "./component/AllCategosy";
import axios from "axios";
import toast from "react-hot-toast";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getAllCategories = async () => {
    try {
      const res = await axios.get(
        "/api/category"
      );

      setCategories(res.data.category);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(
        `/api/category/${id}`
      );

      toast.success("Category deleted successfully..!!");
      getAllCategories();
    } catch (error) {
      toast.error("Unable to complete request..!!");
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-6 pt-7 sm:pt-0">
      <AddCategory
        getAllCategories={getAllCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <AllCategory
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        deleteCategory={deleteCategory}
      />
    </div>
  );
};

export default Category;