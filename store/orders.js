import { createSlice } from '@reduxjs/toolkit'

const ordersSlice = createSlice({
  name: 'home',
  initialState: {
    products: [
      {
        id: 1,
        title: 'Kimono #MOCCA',
        price: '20.00',
        like: false,
        status: 2
      },
      {
        id: 2,
        title: 'bimono #MOCCA',
        price: '30.00',
        like: false,
        status: 0
      },
      {
        id: 3,
        title: 'amono #MOCCA',
        price: '10.00',
        like: false,
        status: 2
      },
      {
        id: 4,
        title: 'dimono #MOCCA',
        price: '70.00',
        like: false,
        status: 3
      },
      {
        id: 5,
        title: 'cimono #MOCCA',
        price: '50.00',
        like: false,
        status: 0
      }
    ],
    filters: {
      category: null,
      min: 0,
      max: 0,
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

export const ordersActions = ordersSlice.actions
export default ordersSlice.reducer;
