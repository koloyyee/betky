import { ITeamState } from './state';
import { ITeamAction } from './actions';


const oldState = {
    teamId: 0,
    team: "",
    failedMsg: ""
}

export function teamReducer(state: ITeamState = oldState, action: ITeamAction):ITeamState {
    switch (action.type) {
        case "LOAD_TEAM_SUCCESS":
            return { ...state, 
                team: action.team.team, 
                teamId: action.team.teamId
            }
        case "LOAD_TEAM_FAILED":
            return { ...state, failedMsg: action.msg }
        default:
            return state
    }
}