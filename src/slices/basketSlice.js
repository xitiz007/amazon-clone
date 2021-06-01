import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const {id} = action.payload;
      const newState = [...state.items];
      const index = newState.findIndex(item => item.id === id);
      if (index >= 0)
      {
        const item = {...newState[index]};
        item.quantity += 1;
        newState[index] = item; 
      }
      else{
        newState.push({...action.payload, quantity: 1});
      }
      state.items = newState;
    },
    removeFromBasket: (state, action) => {
      const id = action.payload;
      const newState = [...state.items];
      const index = newState.findIndex(product => product.id === id);
      if(index >= 0)
      {
        newState.splice(index, 1);
      }
      state.items = newState;
    },
    decrementFromBasket: (state, action) => {
      const id = action.payload;
      const newState = [...state.items];
      const index = newState.findIndex((product) => product.id === id);
      if(index >= 0)
      {
        const item = {...newState[index]};
        if(item.quantity <=1)
        {
          newState.splice(index, 1);
        }
        else
        {
          newState[index].quantity -= 1;
        }
      }
      state.items = newState;
    }
  },
});

export const { addToBasket, removeFromBasket, decrementFromBasket } =
  basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotalPrice = (state) => state.basket.items.reduce(
  (total, item) => total + item.price * item.quantity, 0);

export default basketSlice.reducer;
