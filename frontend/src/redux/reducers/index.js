import { LOGIN, LOGOUT } from "../actions";

const initialState = {
  userData: {
    token: "",
    email: "",
    profilePicture: "",
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userData: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        userData: {
          token: "",
          email: "",
          profilePicture: "",
        },
      };

    default:
      return state;
  }
};

export default rootReducer;
