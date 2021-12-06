import axios from "../helpers/axios";
import { categoryConstants, initialDataConstants, productConstants } from "./constants"

export const getInitialData = () => {
    return async dispatch => {
        // dispatch({ type: initialDataConstants.GET_ALL_INITIAL_DATA_REQUEST});
        const  res = await axios.post('/initialdata');
        if(res.status === 200) {
            const { categories, products } = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories }
            })
            dispatch({
                type: productConstants.GET_ALL_PRODUCT_SUCCESS,
                payload: { products }
            })
        }
        console.log(res.data)
    }
}