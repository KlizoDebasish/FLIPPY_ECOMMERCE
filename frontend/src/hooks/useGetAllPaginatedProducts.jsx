import axios from "axios";
import { useEffect, useState } from "react";
import { setAllPaginatedProducts, setAllProducts } from "../redux/productSlice";
import { useDispatch } from "react-redux";

const useGetAllPaginatedProducts = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URI
          }/getAllProduct?page=${currentPage}&limit=4`
        );

        const { paginatedProduct, totalPages, success } = res.data;

        if (success) {
          setAllProducts(products)
          setProducts(paginatedProduct);
          setTotalPages(totalPages);
          dispatch(setAllPaginatedProducts(paginatedProduct));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchAllProducts();
  }, [dispatch, currentPage]);

  return { products, currentPage, totalPages, setCurrentPage };
};

export default useGetAllPaginatedProducts;
