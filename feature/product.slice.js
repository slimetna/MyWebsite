"use strict";
var _a;
exports.__esModule = true;
exports.deleteProduct = exports.addProduct = exports.setProduct = exports.productSlice = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
exports.productSlice = (0, toolkit_1.createSlice)({
    name: 'product',
    initialState: {
        product: null
    },
    reducers: {
        setProduct: function (state, action) {
            state.product = action.payload;
        },
        addProduct: function (state, _a) {
            var payload = _a.payload;
            state.product.push(payload);
        },
        deleteProduct: function (state, action) {
            state.product = state.product.filter(function (product) { return product.id !== action.payload; });
        }
    }
});
exports.setProduct = (_a = exports.productSlice.actions, _a.setProduct), exports.addProduct = _a.addProduct, exports.deleteProduct = _a.deleteProduct;
exports["default"] = exports.productSlice.reducer;
