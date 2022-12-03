import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: null,
    },
    reducers: {
        setProduct: (state: any, action: any) => {
            state.product = action.payload;
        },
        addProduct: (state: any, { payload }) => {
            state.product.push(payload);
        },
        deleteProduct: (state: any, action: any) => {
            state.product = state.product.filter((product: any) => product.id !== action.payload);
        }
    },
})

export const { setProduct, addProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
