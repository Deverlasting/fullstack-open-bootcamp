// src/reducers/createBlogFormReducer.js
const initialState = {
    title: "",
    author: "",
    url: "",
}

const SET_FORM_TITLE = "SET_FORM_TITLE"
const SET_FORM_AUTHOR = "SET_FORM_AUTHOR"
const SET_FORM_URL = "SET_FORM_URL"
const RESET_FORM = "RESET_FORM"

const createBlogFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FORM_TITLE':
            return { ...state, title: action.data }
        case 'SET_FORM_AUTHOR':
            return { ...state, author: action.data }
        case 'SET_FORM_URL':
            return { ...state, url: action.data }
        case 'RESET_FORM':
            return initialState
        default:
            return state
    }
}

export const setTitle = (title) => {
    return {
        type: SET_FORM_TITLE,
        data: title,
    }
}

export const setAuthor = (author) => {
    return {
        type: SET_FORM_AUTHOR,
        data: author,
    }
}

export const setUrl = (url) => {
    return {
        type: SET_FORM_URL,
        data: url,
    }
}

export const resetForm = () => {
    return {
        type: RESET_FORM,
    }
}

export default createBlogFormReducer
