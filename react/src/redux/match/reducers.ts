import { IMatchState } from './state';
import { IMatchAction } from './actions';


const oldState = {
    match: {
       home: {teamName: "", odd: 0, teamId: 0},
       away: {teamName: "", odd: 0, teamId: 0},
       matchId: 0,
       matchName:"",
       date: new Date()
    },
    failedMsg: ""
}

export function matchReducer(state: IMatchState = oldState, action: IMatchAction):IMatchState {
    switch (action.type) {
        case "LOAD_COMING_MATCH_SUCCESS":
            return {
                ...state,
                match: action.match,
            }
        case "LOAD_MATCH_BY_ID_SUCCESS":
            return {
                ...state,
                match:action.match
            }
        case "LOAD_COMING_MATCH_FAILED":
        case "LOAD_CURRENT_MATCH_FAILED":
            return {
                ...state,
                failedMsg: action.msg
            }
        default:
            return state
    }
}