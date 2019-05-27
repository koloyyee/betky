import { IRegisterState } from './state';
import { IRegisterAction } from './actions';


const oldState={
    isRegistered:false,
    msg:""
}

export function registerReducer(state:IRegisterState = oldState, action:IRegisterAction):IRegisterState{
    switch(action.type) {
        case "REGISTER_SUCCESS":
            return{
                ...state
            }
        case "REGISTER_FAILED":
            return{...state, msg: action.msg}
        default:
            return state
    }
}