// Local Imports.
import { getSession } from "../../helpers/getSession";

// Action Types
export const LOGIN = "user/getSession";
export const LOGOUT = "user/logout";


// Get User Session.
export const getSessionAction = (token) => {
    return async (dispatch) => {
        const data = await getSession(token);
        dispatch({
            type: LOGIN,
            payload: {
                email: data.email,
                profilePicture: data.profilePicture,
            }
        });
    };
};

// Logout User Action.
export const logoutAction = () => {
    return async (dispatch) => {
        dispatch({
            type: LOGOUT,
        });
    };
}