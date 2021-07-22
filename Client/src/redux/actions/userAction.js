import {
    LOAD_USER,
    LOGIN_USER,
    SIGNUP_USER,
    LOGOUT_USER,
    ERROR,
    UP_VOTE,
    UPDATE_USER
} from '../actionTypes';
import axios from 'axios';

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
            console.log('loaded user')
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

export const updateProfile = (data, onSuccess) => {
    return async (dispatch, getstate) => {
        try {
            const token = localStorage.getItem("token");
            const updatedUser = await axios.put('/api/auth/update_user', data, {
                headers: {
                    "authentication": token
                }
            });
            onSuccess();
            console.log(updatedUser.data)
            console.log(updatedUser.data.image);
            dispatch({ type: UPDATE_USER, payload: updatedUser.data })
        } catch (err) {
            console.log(err.response.data);
        }
    }
}


// export const upVote = (currentUserId, userID) => {
//     return async (dispatch, getState) => {
//         try {
//             let token = localStorage.getItem("token");
//             const user = await axios.post('/api/auth/upvote', { userID }, {
//                 headers: {
//                     "authentication": token
//                 }
//             });
//             console.log(user);
//             if (currentUserId === userID) {
//                 dispatch({ type: UP_VOTE, payload: user.data._id })
//             }
//         } catch (e) {
//             console.log(e.response.data);
//         }
//     }
// }