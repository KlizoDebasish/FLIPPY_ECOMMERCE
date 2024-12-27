import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    allproducts: [],
    allpaginatedproducts: [],
    singleProduct: null,
  },
  reducers: {
    //actions
    setAllPaginatedProducts: (state, action) => {
      state.allpaginatedproducts = action.payload;
    },
    setAllProducts: (state, action) => {
      state.allproducts = action.payload;
    },
    setsingleProduct: (state, action) => {
      state.singleProduct = action.payload;
    },
  },
});

export const {
  setAllProducts,
  setAllPaginatedProducts,
  setsingleProduct,
  deleteProduct,
} = productSlice.actions;
export default productSlice.reducer;
