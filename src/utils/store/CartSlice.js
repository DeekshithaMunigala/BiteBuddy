import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const { id: itemId, price, defaultprice } = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);
      const itemPrice = (price || defaultprice || 0) / 100;

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const newItem = {
          ...action.payload,
          quantity: 1,
        };
        state.items.push(newItem);
      }

      state.totalAmount += itemPrice;
    },

    removeItem: (state) => {
      state.items.pop();
    },

    clearItem: (state) => {
      state.items.length = 0;
    },

    increaseItem: (state, action) => {
      const { itemId, price, defaultprice } = action.payload;
      const item = state.items.find(({ id }) => id === itemId);
      const itemPrice = (price || defaultprice || 0) / 100;

      if (item) {
        item.quantity += 1;
        state.totalAmount += itemPrice;
      }
    },

    decreaseItem: (state, action) => {
      const { itemId, price, defaultprice } = action.payload;
      const itemIndex = state.items.findIndex(({ id }) => id === itemId);
      const itemPrice = (price || defaultprice || 0) / 100;

      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        item.quantity -= 1;
        state.totalAmount -= itemPrice;
        if (item.quantity === 0) {
          state.items.splice(itemIndex, 1);
        }
      }
    },
  },
});

export const { addItem, removeItem, clearItem, increaseItem, decreaseItem } =
  CartSlice.actions;
export default CartSlice.reducer;
