
export const notificationInitialState = {
    message: null,
    messageType: null
};

//action creators
export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';


export const setNotificationAction = (message, messageType) => ({
    type: SET_NOTIFICATION,
    payload: { message, messageType }
});

export const clearNotificationAction = () => ({
    type: CLEAR_NOTIFICATION
});

const notificationReducer = (state = notificationInitialState, action) => {
    switch (action.type) {
        case SET_NOTIFICATION:
            return {
                ...state,
                message: action.payload.message,
                messageType: action.payload.messageType
            };
        case CLEAR_NOTIFICATION:
            return notificationInitialState;
        default:
            return state;
    }
};



export default notificationReducer;