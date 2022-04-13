import { createSlice } from "@reduxjs/toolkit";
import { productData } from "../store";

const initialState = {
  filtered: [...productData],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFiltered: (state, action) => {
      state.filtered = [...action.payload];
    },
  },
});

export const { setFiltered } = productSlice.actions;

export default productSlice.reducer;
