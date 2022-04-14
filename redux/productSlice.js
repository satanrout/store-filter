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
    toggleSidebar: (state, action) => {
      if (typeof action.payload !== "undefined") {
        console.log(action.payload, typeof action.payload);
        state.sidebar = action.payload;
      } else {
        console.log(action.payload, "else");
        state.sidebar = !state.sidebar;
      }
    },
  },
});

export const { setFiltered, toggleSidebar } = productSlice.actions;

export default productSlice.reducer;
