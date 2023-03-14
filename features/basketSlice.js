import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // Initially Empty Basket
  items: [],
}
// Basket Slice
export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    // AddToBasket Action
    addToBasket: (state,action ) => {
      // Keep Basket Contents, Add Payload to Basket
      state.items =[...state.items, action.payload]
    },
    // RemoveBasket Action
    removeFromBasket: (state, action) => {
     const index = state.items.findIndex((item) => item.id === action.payload.id);
      let newBasket = [...state.items];
      if (index >= 0) {
        newBasket.splice(index, 1);
      }else {
        console.warn(
          `Can't remove product (id: ${action.payload.id}) as it is not in basket!`
        );
      }

      state.items = newBasket;
    },
    // clearBasket Action
    clearBasket: (state ) => {
      // Clear Basket Contents
      state.items = []
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket, clearBasket, } = basketSlice.actions;

// Selector Declaration: Access global store and pull basket items
export const selectBasketItems = state => state.basket.items;

// Selector Declaration: Access global store and pull basket items with matching id
export const selectBasketItemsWithId = (state, id) =>
  state.basket.items.filter((item) => item.id === id);
// Selector Declaration: Access global store and pull basket total price
export const selectBasketTotal = (state) => state.basket.items.reduce((total,item) => total += item.price, 0);

export default basketSlice.reducer;