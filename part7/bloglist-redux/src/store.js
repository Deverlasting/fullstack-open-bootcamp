import { combineReducers } from 'redux';
import notificationReducer from './reducers/notificationReducer';
import { configureStore } from '@reduxjs/toolkit'

const reducer = combineReducers({
    notification: notificationReducer
});

const store = configureStore({
    reducer
});

export default store;
