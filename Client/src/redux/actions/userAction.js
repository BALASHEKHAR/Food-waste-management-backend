import {
    LOAD_USER,
    LOGIN_USER,
    SIGNUP_USER,
    LOGOUT_USER,
    ERROR
} from '../actionTypes';
import axios from 'axios';
import { LoadPosts } from './postsAction';

export const LoginUser = (data, onSuccess) => {
    return async (dispatch, getState) => {
        try {
            const user = await axios.post('/api/auth/login', data);
            dispatch({ type: LOGIN_USER, payload: user.data });
            localStorage.setItem("token", user.data.token);
            onSuccess();
        } catch (err) {
            console.log(err);
            dispatch({ type: ERROR, payload: err.response })
        }
    }
}

export const signupUser = (data, onSuccess) => {
    return async (dispatch, getState) => {
        try {
            const user = await axios.post('/api/auth/register', data);
            dispatch({ type: SIGNUP_USER, payload: user.data });
            localStorage.setItem("token", user.data.token);
            onSuccess();
        } catch (err) {
            console.log(err);
            dispatch({ type: ERROR, payload: err.response })
        }
    }
}


export const LoadUser = (onSuccess) => {
    return async (dispatch, getState) => {
        try {
            let token = localStorage.getItem("token");
            if (!token) {
                dispatch({ type: ERROR, payload: "token not found" });
                return;
            }
            const user = await axios.get('/api/auth/getuser', {
                headers: {
                    "authentication": token
                }
            });
            dispatch({ type: LOAD_USER, payload: user.data });
            onSuccess();
        } catch (err) {
            console.log(err)
            dispatch({ type: ERROR, payload: err.response })
        }
    }
}

export const LogoutUser = () => {
    return (dispatch, getState) => {
        localStorage.removeItem("token");
        dispatch({ type: LOGOUT_USER });
    }
}