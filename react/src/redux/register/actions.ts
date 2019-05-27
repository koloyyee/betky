type REGISTER_SUCCESS = 'REGISTER_SUCCESS'
type FAILED = "REGISTER_FAILED"

export function registerSuccess(): IRegisterSuccess {
    return {
        type: 'REGISTER_SUCCESS',
    }
}

export function failed(type: FAILED, msg: string):IFailedAction {
    return {
        type,
        msg
    }

}

interface IRegisterSuccess {
    type: REGISTER_SUCCESS;
}

interface IFailedAction {
    type: FAILED;
    msg: string
}

export type IRegisterAction = IRegisterSuccess |
    IFailedAction
