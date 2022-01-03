import { userProfileConstants } from "../actions/constants";

const initState = {
    info: null,
    error: null,
    loading: false
};

export default (state = initState, action) => {
    console.log(action);
    switch (action.type) {
        case userProfileConstants.VIEW_USER_PROFILE_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userProfileConstants.VIEW_USER_PROFILE_SUCCESS:
            state = {
                ...state,
                info: action.payload.info,
                loading: false,
            }
            break;
        case userProfileConstants.VIEW_USER_PROFILE_FAILURE:
            state = {
                ...state,
                error: action.payload.error
            }
            break;
        default:
            break;
    }

    return state;

}

