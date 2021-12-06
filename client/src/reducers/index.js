import { combineReducers } from "redux";

import categoryReducers from './category.reducer';
import productReducers from './product.reducer';

const rootReducer = combineReducers({
    category: categoryReducers,
    product: productReducers

});

export default rootReducer;
