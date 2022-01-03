import axios from "../helpers/axios";
import { userProfileConstants } from "./constants";

export const viewProfile = (payload) => {
    return async (dispatch) => {
        let res;
        try {
            res = await axios.post('/viewProfile', { "user": "61af8a5de2f69222dc1aaeb7" });
            dispatch({ type: userProfileConstants.VIEW_USER_PROFILE_REQUEST});
            if (res.status === 200) {
                dispatch({
                    type: userProfileConstants.VIEW_USER_PROFILE_SUCCESS,
                    payload: { info: res.data.result }
                })
            }
        } catch (error) {
            dispatch({
                type: userProfileConstants.VIEW_USER_PROFILE_FAILURE,
                payload: { reserror: error.response }
            })
        }
    }
}
