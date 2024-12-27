import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllProducts } from "../redux/productSlice";

const useGetAllProduct = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URI}/getAllProduct`
        );
        // console.log(res.data.product);
        if (res.data.success) {
          dispatch(setAllProducts(res.data.product));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllProduct();
  }, [dispatch]);
};

export default useGetAllProduct;