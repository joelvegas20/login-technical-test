// Local Imports.
import { LOGIN, LOGOUT } from "../actions";

// Initial State.
const initialState = {
  userData: {
    email: "",
    profilePicture: "",
  },
};

// Root Reducer.
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login , set the user data.
    case LOGIN:
      return {
        ...state,
        userData: action.payload,
      };
    // Logout , clear the user data.
    case LOGOUT:
      return {
        ...state,
        userData: {
          email: "",
          profilePicture: "",
        },
      };
    // Default case.
    default:
      return state;
  }
};

// Export.
export default rootReducer;
