import {IBetState} from './state'
import {IBetAction} from './actions'

const oldState = {
    bets:{
        teamId: 0,
        matchId: 0,
        odd:0,
        token : 0
    },
    msg: ""
}

export function betReducer(state:IBetState = oldState, action:IBetAction):IBetState{

    switch(action.type){
        case "LOAD_BET_HISTORY_SUCCESS":
            return{
                ...state,
                bets: action.bets
            }
        case "LOAD_ODDS":
            return{
                ...state,
                
            }
        case "SUBMIT_BET_SUCCESS":
            return {
                ...state,
                bets:{...state.bets,
                    teamId: action.teamId,
                    matchId: action.matchId,
                    odd: action.odd,
                    token: action.token
                }
            }
            
        case "CANCEL_BET":
            return state
        case "LOAD_BET_HISTORY_FAILED":
        case "LOAD_ODDS_FAILED":
        case "SUBMIT_BET_FAILED":
            return{
                ...state,
                msg:action.msg
            }
        default:
            return state
    }

}