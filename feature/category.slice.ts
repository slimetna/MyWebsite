import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        category: null,
    },
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        addCategory: (state, { payload }) => {
            state.category.push(payload);
        },
        deleteCategory: (state, action) => {
            state.category = state.category.filter((category) => category.id !== action.payload);
        }
    },
})

export const { setCategory, addCategory, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;
