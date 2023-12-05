import { createSlice } from "@reduxjs/toolkit";

const addedCartToLocalStorageSlice = createSlice({
  name: "addedCartToLocalStorage",
  initialState: {
    isAddingCartToLocalStorage: false,
  },
  reducers: {
    addedCartToLocalStorage: (state, action) => {
      state.isAddingCartToLocalStorage = action.payload;
    },
  },
});

export const addedCartToLocalStorageActions = addedCartToLocalStorageSlice.actions;
export default addedCartToLocalStorageSlice;
