import { createSlice } from '@reduxjs/toolkit'

const wishlistSlice = createSlice({
  name: 'search',
  initialState: {
    allProducts: [
      {
        id: 10,
        title: 'Aimono #MOCCA',
        price: '50.00',
        like: false,
        status: 1 
      },
      {
        id: 11,
        title: 'Aimono #MOCCA 2022',
        price: '60.00',
        like: false,
        status: 3 
      },
      {
        id: 11,
        title: 'Aimono #MOCCA 2022',
        price: '60.00',
        like: false,
        status: 2
      },
      {
        id: 13,
        title: 'Kimono #MOCCA 2023',
        price: '30.00',
        like: false,
        status: 1 
      },
      {
        id: 14,
        title: 'Kimono #MOCCA 2024',
        price: '20.00',
        like: false,
        status: 1 
      },
      {
        id: 15,
        title: 'Kimono #MOCCA 2020',
        price: '10.00',
        like: false,
        status: 1 
      },
      {
        id: 20,
        title: 'Imono #MOCCA',
        price: '50.00',
        like: false,
        status: 4
      },
      {
        id: 111,
        title: 'Mono #MOCCA',
        price: '50.00',
        like: false,
        status: 2
      },
      {
        id: 42,
        title: 'Mono2 #MOCCA',
        price: '50.00',
        like: false,
        status: 3
      },
      {
        id: 54,
        title: 'No #MOCCA',
        price: '50.00',
        like: false,
        status: 3
      }
    ],
    filters: {
      category: 0,
      min: null,
      max: null,
      search: ''
    }
  },
  reducers: {
    setFilters: (state, action) => {
      console.log('test', action.payload)
      state.filters = action.payload
    },
  },
});

export const searchActions = wishlistSlice.actions;

export default wishlistSlice.reducer;
