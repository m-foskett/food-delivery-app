import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    // Initially null state
    restaurant:{
        id: null,
        imgUrl: null,
        title: null,
        rating: null,
        genre: null,
        address: null,
        short_description: null,
        dishes: null,
    },
};
// Restaurant Slice
export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    // SetRestaurant Action
    setRestaurant: (state,action ) => {
      state.restaurant = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRestaurant, } = restaurantSlice.actions;

// Selector Declaration: Access global store and pull current restaurant
export const selectRestaurant = state => state.restaurant.restaurant;

export default restaurantSlice.reducer;