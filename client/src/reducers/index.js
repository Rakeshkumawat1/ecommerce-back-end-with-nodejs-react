import categoryReducer from './category.reducer';
import productReducer from './product.reducer';
import authReducer from './auth.reducer';
import cartReducer from './cart.reducer';
import userReducer from './user.reducer';
import allProductsReducer from './homeProduct.reducer';
import userInfoReducer from './userProfile.reducer'
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    category: categoryReducer,
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    user: userReducer,
    allProducts: allProductsReducer,
    userInfo:  userInfoReducer,
});

export default rootReducer;