import login from "../services/login";
import blogs from "../services/blogs";
import notificationReducer, { notificationInitialState, setNotificationAction, clearNotificationAction } from "./notificationReducer"
import { loggedUserInitialState } from "../context/LoggedUserContext";
import { useReducer } from "react";

// const initialState = {
//     message: null,
//     messageType: null,
// }

// const [notificationState, dispatch] = useReducer(notificationReducer, notificationInitialState)

// Action types
const LOGIN_USER = 'LOGIN_USER'

//action creators
// export const loginUser = (user) => {
//     return {
//         type: LOGIN_USER,
//         payload: user,
//     }
// }

//thunk action creators
export const loginUserAction = async (username, password) => {

    // try {
    const user = await login.login({ username, password });
    window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
    blogs.setToken(user.token);
    // dispatch(loginUser(user))
    return {
        type: LOGIN_USER,
        payload: user,
    }
    // } catch (error) {
    //     // throw new Error("login failed");
    //     // console.log("error", error.response.data.error)
    //     dispatch(setNotificationAction(`${error.response.data.error} - ReacqQuery`, "error"))
    //     setTimeout(() => {
    //         dispatch(clearNotificationAction())
    //     }, 5000)
    // }
}


const loggedUserReducer = (state = loggedUserInitialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            // console.log(action)
            return {
                ...state,
                ...action.payload
                // user: action.payload
            }
        default:
            return state;
    }
}

export default loggedUserReducer;

// const userReducer = (state = loggedUserInitialState, action) => {
//     switch (action.type) {
//         case LOGIN_USER:
//             // console.log(action)
//             return {
//                 ...state,
//                 ...action.payload
//                 // user: action.payload
//             }
//         default:
//             return state;
//     }
// }

// export default userReducer;