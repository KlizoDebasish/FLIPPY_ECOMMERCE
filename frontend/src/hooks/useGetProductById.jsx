import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setsingleProduct } from "../redux/productSlice";

const useGetProductById = (productId) => {
  const dispatch = useDispatch();
  // console.log(productId);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URI}/getProduct/${productId}`
        );
        // console.log(res.data.product);
        if (res.data.success) {
          dispatch(setsingleProduct(res.data.product));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleProduct();
  }, [productId, dispatch]);
};

export default useGetProductById;
