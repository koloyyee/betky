import { IAuthState } from './state';
import { IAuthActions } from './actions';


const initialState = {
    isAuthenticated: (localStorage.getItem('token') != null)
};

export function authReducer(state: IAuthState = initialState, action: IAuthActions):IAuthState {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return Object.assign({}, state, {
                isAuthenticated: true
            });
        case "LOGIN_FAILED":
            return state;
        case "LOGOUT_SUCCESS":
            return Object.assign({}, state, {
                isAuthenticated: false
            });
        default:
            return state;
    }
}

