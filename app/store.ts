import { configureStore, createReducer } from "@reduxjs/toolkit";
import productReducer from "../feature/product.slice";
import categoryReducer from "../feature/category.slice";

export default configureStore({
    reducer: {
        product: productReducer,
        category: categoryReducer,
    },
});