import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;

const AddProduct = ({
  selectedProduct,
  setSelectedProduct,
  getAllProducts,
}) => {
  const [btnText, setBtnText] = useState("Add Product");
  const [btnColor, setBtnColor] = useState("text-white");
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name,
        description: selectedProduct.description,
        price: selectedProduct.price,
        stock: selectedProduct.stock,
        category: selectedProduct.category._id,
        imageUrl: selectedProduct.imageUrl,
      });

      setBtnText("Update Product");
    } else {
      setBtnText("Add Product");
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        imageUrl: "",
      });
    }
  }, [selectedProduct]);

  useEffect(() => {
    axios
      .get("/api/category")
      .then((res) => {
        setCategories(res.data.category);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setBtnText(
        selectedProduct ? "Updating..." : "Adding..."
      );
      setBtnColor("text-green-700");

      if (selectedProduct) {
        await axios.put(
          `/api/product/${selectedProduct._id}`,
          formData
        );

        toast.success("Product Updated Successfully");
      } else {
        await axios.post(
          "/api/product",
          formData
        );

        toast.success("Product Added Successfully");
      }

      await getAllProducts();

      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        imageUrl: "",
      });

      setSelectedProduct(null);
      setBtnText("Add Product");
    } catch (error) {
      toast.error("Something Went Wrong");
      console.log(error);

      setBtnText(
        selectedProduct
          ? "Update Product"
          : "Add Product"
      );
    }
  };

  return (
    <div className="w-full lg:w-2/5">
      <form
        onSubmit={handleSubmit}
        className="w-full mt-5 bg-white p-4 md:p-6 rounded-2xl shadow-xl"
      >
        <h1 className="text-center mb-6 text-xl md:text-2xl font-bold text-slate-700">
          {selectedProduct
            ? "Edit Product"
            : "Add Product"}
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Product Name"
            className="w-full bg-slate-100 p-3 rounded-xl border border-white outline-none focus:border-sky-500"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <textarea
            placeholder="Description"
            className="w-full bg-slate-100 p-3 rounded-xl border border-white outline-none  focus:border-sky-500 resize-none"
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            placeholder="Price"
            className="w-full bg-slate-100 p-3 rounded-xl border border-white outline-none focus:border-sky-500"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            placeholder="Stock"
            className="w-full bg-slate-100 p-3 rounded-xl border border-white outline-none focus:border-sky-500"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-slate-100 p-3 rounded-xl border border-white outline-none focus:border-sky-500"
            required
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option
                key={cat._id}
                value={cat._id}
              >
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Image URL"
            className="w-full bg-slate-100 p-3 rounded-xl border border-white outline-none focus:border-sky-500"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />

          {formData.imageUrl && (
            <div className="flex justify-center">
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-xl border"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
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

export default AddProduct;