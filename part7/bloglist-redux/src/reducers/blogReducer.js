// src/reducers/blogReducer.js
import blogService from '../services/blogs'

// Action types
const SET_BLOGS = 'SET_BLOGS'
const UPDATE_BLOG = 'UPDATE_BLOG'
// const CREATE_BLOG = 'CREATE_BLOG'

// Action creators
export const setBlogs = (blogs) => {
    return {
        type: SET_BLOGS,
        data: blogs,
    }
}

export const updateBlogAction = (blog) => {
    return {
        type: UPDATE_BLOG,
        data: blog,
    }
}

// export const createBlogAction = (blog) => {
//     return {
//         type: CREATE_BLOG,
//         data: blog,
//     }
// }


// Thunk action creator for fetching blogs
export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

// Reducer
const blogReducer = (state = [], action) => {
    switch (action.type) {
        case SET_BLOGS:
            // return action.data
            return action.data
        case UPDATE_BLOG:
            // return action.data
            // console.log(state, action)
            // const updatedBlogs = state.map((blog) => (blog.id === action.data.id ? action.data : blog))
            // return updatedBlogs
            return state
        // case CREATE_BLOG:
        //     // return action.data
        //     return [...state, action.data]
        default:
            return state

    }
}

export default blogReducer
