const initialState = {
    message: null,
    messageType: null
};

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NOTIFICATION:
            return {
                ...state,
                message: action.payload.message,
                messageType: action.payload.messageType
            };
        case CLEAR_NOTIFICATION:
            return initialState;
        default:
            return state;
    }
};

// puede ir en un archivo aparte -> actions/notificationActions.js
//action creators
export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';

export const setNotification = (message, messageType) => ({
    type: SET_NOTIFICATION,
    payload: { message, messageType }
});

export const clearNotification = () => ({
    type: CLEAR_NOTIFICATION
});

export default notificationReducer;