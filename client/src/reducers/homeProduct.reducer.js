import { productConstants } from "../actions/constants";

const initState = {
  products: [],
  priceRange: {},
  productsByPrice: {},
  error: null,
  loading: true,
  loadMore: true,
};

export default (state = initState, action) => {
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCT_REQUEST:
      state = {
        ...state
      };
      break;
    case productConstants.GET_ALL_PRODUCT_SUCCESS:
      state = {
        ...state,
        products: !state.products.length ? action.payload.allProducts : state.products.concat(action.payload.allProducts),
        loadMore: action.payload.allProducts.length < 8 ? false : true,
        loading: action.payload.allProducts.length < 8 ? false : true
      };
      break;
    case productConstants.GET_ALL_PRODUCT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loadMore: false,
        loading: false,
      };
      break;
    default:
      break;
  }

  return state;
};
