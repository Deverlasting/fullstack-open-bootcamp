import blogService from '../services/blogs';

// Action types
const SHOW_BLOGS = 'SHOW_BLOGS'
const ADD_BLOG = 'ADD_BLOG'
const LIKE_BLOG = 'LIKE_BLOG'
const REMOVE_BLOG = 'REMOVE_BLOG'

// Action creators
export const showBlogsAction = (blogs) => {
    return {
        type: SHOW_BLOGS,
        payload: blogs,
    }
}

export const addBlogAction = (blog) => {
    return {
        type: ADD_BLOG,
        payload: blog,
    }
};

export const likeBlogAction = (blog) => {
    return {
        type: LIKE_BLOG,
        payload: blog,
    }
}

export const removeBlogAction = (blog) => {
    return {
        type: REMOVE_BLOG,
        payload: blog,
    }
}


// Thunk action creators
export const getAllBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll();
        dispatch(showBlogsAction(blogs));
    };
};

export const likeBlog = (blog) => {
    return async (dispatch) => {
        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1,
        }
        await blogService.update(blog.id, updatedBlog)
        dispatch(likeBlogAction(updatedBlog))
    };
};

export const removeBlog = (blog) => {
    return async (dispatch) => {
        if (window.confirm(`Remove ${blog.title}?`)) {
            await blogService.remove(blog.id)
        }
        dispatch(getAllBlogs());
    }
}



// Reducer
const blogReducer = (state = [], action) => {
    switch (action.type) {
        case SHOW_BLOGS:
            return action.payload
        case ADD_BLOG:
            return [...state, action.payload];
        case LIKE_BLOG:
            return state.map((blog) =>
                blog.id === action.payload.id ? { ...blog, likes: blog.likes + 1 } : blog
                // blog.id === action.payload.id ? action.payload : blog
            )
        case REMOVE_BLOG:
            return action.payload
        default:
            return state

    }
}

export default blogReducer;