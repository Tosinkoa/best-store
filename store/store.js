import { configureStore } from "@reduxjs/toolkit";
import { fetcherApi } from "./fetcherApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import addedCartToLocalStorageSlice from "./slices/added-cart-to-localstorage";

const store = configureStore({
  reducer: {
    [fetcherApi.reducerPath]: fetcherApi.reducer,
    addedCartToLocalStorage: addedCartToLocalStorageSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fetcherApi.middleware),
});
setupListeners(store.dispatch);
export default store;
