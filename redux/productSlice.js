import { createSlice } from "@reduxjs/toolkit";
import { productData } from "../store";

const initialState = {
  filtered: [...productData],
  sidebar: false,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFiltered: (state, action) => {
      state.filtered = [...action.payload];
    },
    toggleSidebar: (state) => {
      state.sidebar = !state.sidebar;
    },
  },
});

export const { setFiltered, toggleSidebar } = productSlice.actions;

export default productSlice.reducer;
