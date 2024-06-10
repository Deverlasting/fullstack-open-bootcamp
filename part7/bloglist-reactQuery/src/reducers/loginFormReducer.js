import { loginFormUserInitialState } from "../context/LoginFormContext";
// Action types
const SET_USERNAME = 'SET_USERNAME';
const SET_PASSWORD = 'SET_PASSWORD';


//action creator
export const setUsernameAction = (username) => ({
    type: SET_USERNAME,
    payload: username,
});

export const setPasswordAction = (password) => ({
    type: SET_PASSWORD,
    payload: password,
});


//Reducer
const loginUserReducer = (state = loginFormUserInitialState, action) => {
    switch (action.type) {
        case SET_USERNAME:
            return {
                ...state,
                username: action.payload,
            };
        case SET_PASSWORD:
            return {
                ...state,
                password: action.payload,
            };
        default:
            return state;
    }
}

export default loginUserReducer;
