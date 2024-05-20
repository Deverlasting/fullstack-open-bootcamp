import { createContext, useReducer } from 'react';

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return { ...state, message: action.message, isVisible: true };
        case 'HIDE_NOTIFICATION':
            return { ...state, isVisible: false };
        default:
            throw new Error('Unhandled action type');
    }
};

const NotificationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(notificationReducer, {
        message: '',
        isVisible: false,
    });

    return (
        <NotificationContext.Provider value={{ state, dispatch }}>
            {children}
        </NotificationContext.Provider>
    );
};

export { NotificationContext, NotificationProvider };