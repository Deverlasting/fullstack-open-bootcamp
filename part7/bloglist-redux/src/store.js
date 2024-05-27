import { combineReducers } from 'redux';
import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import createBlogFormReducer from './reducers/createBlogFormReducer';

import { configureStore } from '@reduxjs/toolkit'

const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogReducer,
    createBlogForm: createBlogFormReducer,
});

const store = configureStore({
    reducer
});

export default store;
