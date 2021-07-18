import React from 'react';
import { Redirect } from 'react-router-dom';

function Auth(props) {

    let token = localStorage.getItem("token");

    if (!props.login) {
        if (token) {
            return props.children
        }
        else {
            return <Redirect to="/login" />
        }
    }
    else {
        if (token) {
            return <Redirect to="/" />
        }
        else {
            return props.children;
        }
    }
}

export default Auth
