// Local Imports.
import { getSession } from "../../helpers/getSession";

// Action Types
export const LOGIN = "user/getSession";
export const LOGOUT = "user/logout";


// Get User Session.
export const getSessionAction = (token) => {
    return async (dispatch) => {
        const data = await getSession(token);
        console.log (token.token);
        dispatch({
            type: LOGIN,
            payload: {
                token: token.token,
                email: data.email,
                profilePicture: data.profilePicture,
            }
        });
    };
};

export const logoutAction = () => {
    return async (dispatch) => {
        dispatch({
            type: LOGOUT,
        });
    };
}