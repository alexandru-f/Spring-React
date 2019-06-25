import axios from 'axios';
import {SET_CURRENT_USER, GET_ERRORS, GET_SUCCES_PASSCHANGE, RECOVER_PASSWORD_SUCCESS,RESET_PASSWORD_SUCCESS,GET_PASS_TOKEN} from './types';
import setJWTToken from '../securityUtils/setJWTToken';
import jwt_decode from 'jwt-decode';

export const createNewUser = (newUser, history) => async dispatch => {
    try {
        await axios.post("/api/users/register", newUser);
        history.push("/login");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch(err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const clearErrors = () => async dispatch => {
    dispatch({
        type: GET_ERRORS,
        payload: {}
    });
}
export const clearIsRecoverPassOk = () => async dispatch => {
    dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: false
    });  
};



export const login = LoginRequest => async dispatch => {
    try {
    //post => Login request
    const res = await axios.post("/api/users/login", LoginRequest);
    //extract the token from the res.data
    const {token} = res.data;
    //store the token into the localStorage
    localStorage.setItem("jwtToken", token);
    //set token in the header
    setJWTToken(token);
    //decode the token on React
    const decoded = jwt_decode(token);
    //dispatch to our securityReducer
    dispatch({
        type: SET_CURRENT_USER,
        payload: decoded
    });
    } catch(err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const changePassword = (changePassRequest, history) => async dispatch => {
    try {
        const res = await axios.post("/api/users/updatePassword", changePassRequest);
        dispatch({
            type: GET_SUCCES_PASSCHANGE,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const recoverPassword = (recoverPasswordRequest) => async dispatch => {
    try {
        await axios.post("/api/users/forgotPassword", recoverPasswordRequest);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
        dispatch({
            type: RECOVER_PASSWORD_SUCCESS,
            isRecoverPassOk: true
        });
    } catch(err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const validateToken = (token) => async dispatch => {
    try {
        const res = await axios.get(`/api/users/resetPassword?token=${token}`);
        dispatch({
            type: GET_PASS_TOKEN,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const resetPassword = (resetPassRequest, token, history) => async dispatch => {
    try {
        await axios.post(`/api/users/resetPassword?token=${token}`, resetPassRequest);
        history.push("/login");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const logout = () => async dispatch => {
    localStorage.removeItem("jwtToken");
    setJWTToken(false);
    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    });  
};