import { ThunkResult } from '../../store';
import { Dispatch } from 'redux';
import { CallHistoryMethodAction, push } from 'connected-react-router';
import { loadMessageSuccess } from '../chat/actions';

type LOGIN_SUCCESS = 'LOGIN_SUCCESS';
type LOGIN_FAILED = 'LOGIN_FAILED';
type LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

const { REACT_APP_API_SERVER } = process.env;

export function login(username: string, password: string): ThunkResult<void> {
    return async (dispatch: Dispatch) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/member/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({ username, password })
        });
        const result = await res.json();

        if (res.status !== 200) {
            dispatch(loginFailed(result.msg));

        } else {
            localStorage.setItem('token', result.token);
            dispatch(loginSuccess())

            const res2 = await fetch(`${REACT_APP_API_SERVER}/chat`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            const result2 = await res2.json()
            if (res2.status === 200) {
                dispatch(loadMessageSuccess(result2.chatHistory))
            }
        }
        dispatch(push('/'))
    }
}

export function facebookLogin(accessToken: string): ThunkResult<void> {
    return async (dispatch: Dispatch<IAuthActions | CallHistoryMethodAction>) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/login/facebook`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({ accessToken })
        })
        const result = await res.json();

        if (res.status !== 200) {
            dispatch(loginFailed(result.msg));
        } else {
            localStorage.setItem('token', result.token);
            dispatch(loginSuccess())
            dispatch(push("/"));
        }
    }
}


export function logout(): ThunkResult<void> {
    return (dispatch: Dispatch<IAuthActions | CallHistoryMethodAction>) => {
        dispatch(logoutSuccess());
        localStorage.removeItem('token');
        dispatch(push('/'));
    }
}

export function logoutSuccess(): ILogoutSuccessAction {
    return {
        type: 'LOGOUT_SUCCESS'
    }
}

export function loginSuccess(): ILoginSuccessAction {
    return {
        type: 'LOGIN_SUCCESS'
    }
}

export function loginFailed(message: string): ILoginFailedAction {
    return {
        type: "LOGIN_FAILED",
        message
    }
}

interface ILogoutSuccessAction {
    type: LOGOUT_SUCCESS
}


interface ILoginSuccessAction {
    type: LOGIN_SUCCESS
};

interface ILoginFailedAction {
    type: LOGIN_FAILED,
    message: string
};

export type IAuthActions = ILoginSuccessAction | ILoginFailedAction | ILogoutSuccessAction;