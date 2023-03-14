import { configureStore } from '@reduxjs/toolkit'
import basketReducer from "./features/basketSlice";
import restaurantReducer from "./features/restaurantSlice";
// Redux Global Store Declaration
export const store = configureStore({
  reducer: {
    // Connecting Basket Slice to Global Store
    basket: basketReducer,
    // Connecting Restaurant Slice to Global Store
    restaurant: restaurantReducer,
  },
});