import { Product } from '@prisma/client';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { productApi } from '../../app/services/product';

interface IInitialState {
  products: Product[] | null
}

const initialState: IInitialState = {
  products: null,
}

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(productApi.endpoints.getAllProducts.matchFulfilled, (state, action) => {
        state.products = action.payload;
      })
  }
})

export default slice.reducer;
export const selectProducts = (state: RootState) => state.products;