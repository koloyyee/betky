import { IMatch } from './state';



type LOAD_MATCH_BY_ID_SUCCESS = 'LOAD_MATCH_BY_ID_SUCCESS'
type LOAD_COMING_MATCH_SUCCESS = 'LOAD_COMING_MATCH_SUCCESS'
type FAILED ="LOAD_CURRENT_MATCH_FAILED" | "LOAD_COMING_MATCH_FAILED"

export function loadMatchByIdSuccess(matchId: number, match: IMatch ):ILoadMatchByIdSuccess{
    return{
        type: 'LOAD_MATCH_BY_ID_SUCCESS',
        matchId,
        match
    }
}
export function loadComingMatchSuccess(date: Date, match: IMatch):ILoadComingMatchSuccess{
    return{
        type: 'LOAD_COMING_MATCH_SUCCESS',
        date,
        match
    }
}

export function failed (type:FAILED, msg:string):IFailedAction{
    return {
        type,
        msg
    }

}

interface ILoadMatchByIdSuccess {
    type: LOAD_MATCH_BY_ID_SUCCESS;
    matchId: number;
    match: IMatch
}

interface ILoadComingMatchSuccess {
    type: LOAD_COMING_MATCH_SUCCESS;
    date: Date;
    match: IMatch
}

interface IFailedAction {
    type: FAILED;
    msg:string
}

export type IMatchAction = ILoadMatchByIdSuccess|
                           ILoadComingMatchSuccess|
                           IFailedAction
