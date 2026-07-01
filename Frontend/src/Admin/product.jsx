import { useState, useEffect } from "react";
import AddProduct from "./component/AddProduct";
import AllProduct from "./component/AllProduct";
import axios from "axios";
import toast from "react-hot-toast";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getAllProducts = async () => {
    try {
      const res = await axios.get(
        "/api/product"
      );

      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `/api/product/${id}`
      );

      toast.success("Product deleted successfully");
      getAllProducts();
    } catch (error) {
      toast.error("Unable to delete product");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-6 pt-7 sm:pt-0">
      <AddProduct
        getAllProducts={getAllProducts}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />

      <AllProduct
        products={products}
        setSelectedProduct={setSelectedProduct}
        deleteProduct={deleteProduct}
      />
    </div>
  );
};

export default Product;