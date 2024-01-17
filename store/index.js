import {configureStore} from "@reduxjs/toolkit";
import wishlistReducer from './wl';
import ordersReducer from './orders';
import searchReducer from './serach';

const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    orders: ordersReducer,
    search: searchReducer
   
  },
});

export default store;
