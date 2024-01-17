import { createSlice } from '@reduxjs/toolkit'

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    allProducts: [
      {
        id: 1,
        title: 'Kimono #MOCCA',
        price: '50.00',
        like: false,
        status: 2
      },
      {
        id: 2,
        title: 'Kimono #MOCCA',
        price: '50.00',
        like: false,
        status: 3
      },
      {
        id: 3,
        title: 'Kimono #MOCCA',
        price: '50.00',
        like: false,
        status: 2
      },
      {
        id: 4,
        title: 'Kimono #MOCCA',
        price: '50.00',
        like: false,
        status: 3
      },
      {
        id: 5,
        title: 'Kimono #MOCCA',
        price: '50.00',
        like: false,
        status: 2
      }
    ],
    products: [

    ]
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = [...state.products, action.payload]
    },
    addToWishlist: (state, action) => {
      state.products.push(action.payload)
      const p = state.allProducts.find(p => p.id === action.payload.id)
      if (!p) {
        return
      }

      p.like = true
    },
    removeToWishlist: (state, action) => {
      state.products = state.products.filter(p => p.id !== action.payload.id)
      const p = state.allProducts.find(p => p.id === action.payload.id)
      if (!p) {
        return
      }

      p.like = false
    }
  },
});

export const wishlistActions = wishlistSlice.actions;

export default wishlistSlice.reducer;
