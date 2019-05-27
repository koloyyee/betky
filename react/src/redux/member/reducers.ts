import { IMemberState } from './state';
import { IMemberAction } from './actions';

const oldState = {
    self:{
        name:"",
        token:0,
        email:""
    },
    betHistory:[],
    rank:[],
    msg:""
}

export function memberReducer(state: IMemberState = oldState, action: IMemberAction):IMemberState {
    switch (action.type) {
        case 'LOAD_SELF_SUCCESS':
            return {
                ...state,
                self: action.self
            }
        case 'LOAD_HISTORY_BY_ID_SUCCESS':
            return {
                ...state,
                betHistory:action.betHistory
            }
        case 'LOAD_RANKING_SUCCESS':
            return {
                ...state,
                rank:action.rank
            }
        case 'LOAD_SELF_FAILED':
        case 'LOAD_HISTORY_BY_ID_FAILED':
        case 'LOAD_RANKING_FAILED':
            return {
                ...state,
                msg:action.msg
            }
        default:
            return state
    }
}