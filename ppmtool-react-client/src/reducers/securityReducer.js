import {SET_CURRENT_USER, GET_SUCCES_PASSCHANGE, RECOVER_PASSWORD_SUCCESS, RESET_PASSWORD_SUCCESS, GET_PASS_TOKEN, GET_SUCCESS_RESETPASS} from '../actions/types';

const initialState = {
    user: {},
    validToken: false,
    success: '',
    passChange: '',
    isRecoverPassOk: false,
    isPassTokenValid: false,
    isResetPassSuccess: false,
    passToken: ''
};

const booleanActionPayload = (payload) => {
    if (payload) {
        return true;
    } else {
        return false;
    }
};

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                validToken: booleanActionPayload(action.payload),
                user: action.payload
            };
        case GET_SUCCES_PASSCHANGE:
            return {
                ...state,
                passChange: action.payload
            };
        case RECOVER_PASSWORD_SUCCESS:
            return {
                ...state,
                isRecoverPassOk: true
            };
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                isRecoverPassOk: false
            };
        case GET_PASS_TOKEN:
            return {
                ...state,
                isPassTokenValid: booleanActionPayload(action.payload),
                passToken: action.payload
            };
        case GET_SUCCESS_RESETPASS:
            return {
                ...state,
                isResetPassSuccess: true
            };
        default: 
            return state;
    }
}