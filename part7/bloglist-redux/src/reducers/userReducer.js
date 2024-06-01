import login from "../services/login";
import blogs from "../services/blogs";
import { setNotification, clearNotification } from "../reducers/notificationReducer"

// Action types
const LOGIN_USER = 'LOGIN_USER'
const SET_USER = 'SET_USER'
const RESET_LOGIN_FORM = 'RESET_LOGIN_FORM'
const SET_USERNAME = 'SET_USERNAME';
const SET_PASSWORD = 'SET_PASSWORD';
const SET_USER_FROM_LOCAL_STORAGE = 'SET_USER_FROM_LOCAL_STORAGE'

//action creator
export const loginUserAction = (user) => {
    return {
        type: LOGIN_USER,
        payload: user,
    }
}

export const setUserAction = (user) => {
    return {
        type: SET_USER,
        payload: user,
    }
}

export const resetLoginFormAction = () => {
    return {
        type: RESET_LOGIN_FORM,
    }
}

export const setUsernameAction = (username) => ({
    type: SET_USERNAME,
    payload: username,
});

export const setPasswordAction = (password) => ({
    type: SET_PASSWORD,
    payload: password,
});

// export const setUserFromLocalStorageAction = (user) => ({
//     type: SET_USER_FROM_LOCAL_STORAGE,
//     payload: user,
// });

//thunk action creators
export const loginUser = (username, password) => {
    // export const loginUser = () => {
    // const { username, password } = getState().user;
    return async (dispatch) => {
        try {
            const user = await login.login({ username, password });
            window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
            blogs.setToken(user.token);
            dispatch(setUserAction(user));
            // dispatch(setUserFromLocalStorageAction(user));
            // dispatch(resetLoginFormAction());
        } catch (error) {
            dispatch(setNotification(`${error.response.data.error} - redux`, "error"))
            setTimeout(() => {
                dispatch(clearNotification())
            }, 5000)
        }
    }
}

//Reducer
const initialState = {
    user: null,
    username: "",
    password: ""
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }
        case RESET_LOGIN_FORM:
            return {
                ...state,
                username: "",
                password: ""
            }
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
        // case SET_USER_FROM_LOCAL_STORAGE:
        //     return {
        //         ...state,
        //         user: action.payload
        //     };
        default:
            return state;
    }
}

export default userReducer;

