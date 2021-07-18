import {
    CREATE_POST,
    LOAD_POSTS,
    UPDATE_POST,
    DELETE_POST,
    ERROR
} from '../actionTypes';
import axios from 'axios'

export const LoadPosts = () => {
    return async (dispatch, getState) => {
        try {
            const posts = await axios.get('/api/post/allposts');

            dispatch({ type: LOAD_POSTS, payload: posts.data })
        } catch (err) {
            dispatch({ type: ERROR, payload: err.response })
        }
    }
}

export const CreatePosts = () => {
    return async (dispatch, getState) => {
        try {

        } catch (err) {

        }
    }
}
