import { ITeamState } from './state';

// import { ITeamState } from './state';

type LOAD_TEAM_SUCCESS = 'LOAD_TEAM_SUCCESS'
type FAILED = "LOAD_TEAM_FAILED"

export function loadTeamSuccessById(id:number, team: ITeamState): ILoadTeamSuccess {
    return {
        type: 'LOAD_TEAM_SUCCESS',
        id,
        team
    }
}

export function failed(type: FAILED, msg: string) {
    return {
        type,
        msg
    }

}

interface ILoadTeamSuccess {
    type: LOAD_TEAM_SUCCESS;
    id: number
    team: ITeamState
}

interface IFailedAction {
    type: FAILED;
    msg: string
}

export type ITeamAction = ILoadTeamSuccess |
    IFailedAction
