import axios from "../helpers/axios"
import { productConstants } from "./constants";

export const getProductsBySlug = (slug) => {
    return async dispatch => {
        let res;
        try {
            res  = await axios.get(`/products/${slug}`);
            if (res.status === 200) {
                return dispatch({
                    type: productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS,
                    payload: res.data
                })
            }
        } catch (error) {
            dispatch({
                type: productConstants.GET_PRODUCTS_BY_SLUG_FAILURE,
                payload: { error: error.response }
            })

        }

        // const res = await axios.get(`/products/${slug}`);
        // if (res.status === 200) {
        //     dispatch({
        //         type: productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS,
        //         payload: res.data
        //     })
        // } else {
        //     // TODO for faliure dispatch.
        //     dispatch({
        //         type: productConstants.GET_PRODUCTS_BY_SLUG_FAILURE,
        //         payload: 
        //     })
        // }
    }
}

export const getProductPage = (payload) => {
    return async dispatch => {
        try {
            const { cid, type } = payload.params;
            const res = await axios.get(`/page/${cid}/${type}`);
            dispatch({ type: productConstants.GET_PRODUCT_PAGE_REQUEST });
            if (res.status === 200) {
                const { page } = res.data;
                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
                    payload: { page }
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_FAILURE,
                    payload: { error }
                });
            }
        } catch (error) {
            console.log(error)
        }

    }
}

export const getProductDetailsById = (payload) => {
    return async dispatch => {
        dispatch({ type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST });
        let res;
        try {
            const { productId } = payload.params;
            res = await axios.get(`/product/${productId}`);
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
                payload: { productDetails: res.data.product }
            });

        } catch (error) {
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
                payload: { error: res.data.error }
            });
        }

    }
}

export const getAllProducts = (payload) => {
    return async dispatch => {
        // dispatch({ type: productConstants.GET_ALL_PRODUCT_REQUEST });
        let res;
        try {
            res = await axios.post('/allProducts', payload);
            if (res.status === 200) {
                return dispatch({
                    type: productConstants.GET_ALL_PRODUCT_SUCCESS,
                    payload: { allProducts: res.data.allProducts }
                })
            }
        } catch (error) {
            dispatch({
                type: productConstants.GET_ALL_PRODUCT_FAILURE,
                payload: { error: error.response }
            })

        }

    }
}