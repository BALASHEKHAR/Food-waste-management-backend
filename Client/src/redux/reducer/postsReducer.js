import {
    CREATE_POST,
    LOAD_POSTS,
    UPDATE_POST,
    DELETE_POST,
    ERROR
} from '../actionTypes';

let initState = {
    posts: [],
    loading: true,
    error: null,
}

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case LOAD_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false,
                error: null
            };
        case CREATE_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
                loading: false,
                error: null
            };
        case UPDATE_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts.filter((post) => post._id != action.payload._id)],
                loading: false,
                error: null

            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== action.payload._id),
                loading: false,
                error: null
            };
        case ERROR:
            return {
                ...state,
                posts: null,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export default postReducer;