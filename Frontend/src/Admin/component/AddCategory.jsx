import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
axios.defaults.withCredentials = true;


const AddCategory = ({ selectedCategory, setSelectedCategory, getAllCategories }) => {

  const [btnText, setBtnText] = useState("Add Category");
  const [btnColor, setBtnColor] = useState("text-white");

  const [formData, setFormData] = useState({
    name: "",
    imageUrl: ""
  });

  // Fill form when editing
  useEffect(() => {
    if (selectedCategory) {
      setFormData({
        name: selectedCategory.name,
        imageUrl: selectedCategory.imageUrl
      });
      setBtnText("Update Category");
    } else {
      setBtnText("Add Category");
    }
  }, [selectedCategory]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (selectedCategory) {
        setBtnText("Updating...")
        setBtnColor("text-green-700");
        await axios.put(
          `/api/category/${selectedCategory._id}`,
          formData
        );
        toast.success("Category updated...!!");
        getAllCategories();
        

      } else {
        setBtnText("Adding..");
        setBtnColor("text-green-700")
        await axios.post(
          "/api/category",
          formData
        );
        toast.success("Category added..!!")
        getAllCategories();
      }

    
      await getAllCategories();

      setFormData({
        name: "",
        imageUrl: ""
      });

      setSelectedCategory(null);

       setBtnText("Add Category");
        setBtnColor("text-white");

    } catch (error) {
      toast.error(error.message);

      setTimeout(() => {
        setBtnText(selectedCategory ? "Update Category" : "Add Category");
        setBtnColor("text-white");
      }, 3000);
    }
  };

  return (
  <div className="w-full lg:w-2/5 px-4 md:px-6">
    <form
      className="w-full mt-5 bg-white p-4 md:p-6 rounded-2xl shadow-xl"
      onSubmit={handleSubmit}
    >
      <h1 className="text-center mb-6 text-xl md:text-2xl font-bold text-slate-700">
        {selectedCategory ? "Edit Category" : "Add Category"}
      </h1>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Category Name"
          className="w-full bg-slate-100 p-3 rounded-xl outline-none border border-transparent focus:border-sky-500"
          name="name"
          onChange={handleChange}
          value={formData.name}
          required
        />

        <input
          type="text"
          placeholder="Image URL"
          className="w-full bg-slate-100 p-3 rounded-xl outline-none border border-transparent focus:border-sky-500"
          name="imageUrl"
          onChange={handleChange}
          value={formData.imageUrl}
          required
        />

        {/* Preview */}
        {formData.imageUrl && (
          <div className="flex justify-center">
            <img
              src={formData.imageUrl}
              alt="preview"
              className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-xl border"
            />
          </div>
        )}

        <button
          className={`w-full bg-sky-500 ${btnColor} py-3 rounded-xl font-semibold hover:bg-sky-400 transition active:scale-95`}
          type="submit"
        >
          {btnText}
        </button>
      </div>
    </form>
  </div>
);
};

export default AddCategory;