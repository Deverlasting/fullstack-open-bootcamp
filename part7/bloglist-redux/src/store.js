import { combineReducers } from 'redux';
import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer';

import { configureStore } from '@reduxjs/toolkit'

const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
});

const store = configureStore({
    reducer
});

export default store;
