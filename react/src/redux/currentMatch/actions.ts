import { ICurrentMatch } from './state';


type LOAD_CURRENT_MATCH_SUCCESS = 'LOAD_CURRENT_MATCH_SUCCESS'
type LOAD_CURRENT_MATCH_FAILED = 'LOAD_CURRENT_MATCH_FAILED'
type MODIFY_ODDS = "MODIFY_ODDS";

export function loadCurrentMatchSuccess(currentMatch:ICurrentMatch):ILoadCurrentMatchSuccess{
    return{
        type: "LOAD_CURRENT_MATCH_SUCCESS",
        currentMatch
    }
}

export function failed(msg:string):ILoadCurrentMatchFailed{
    return{
        type: "LOAD_CURRENT_MATCH_FAILED",
        msg
    }
}

export function modifyOdds(homeOdd: number, awayOdd: number): IModifyOdd {
    return {
        type: "MODIFY_ODDS",
        homeOdd,
        awayOdd
    }
}


export interface IModifyOdd {
    type: MODIFY_ODDS
    homeOdd: number
    awayOdd: number
}

export interface ILoadCurrentMatchSuccess {
    type: LOAD_CURRENT_MATCH_SUCCESS
    currentMatch: ICurrentMatch
}

export interface ILoadCurrentMatchFailed {
    type:LOAD_CURRENT_MATCH_FAILED,
    msg:string
}

export type ICurrentMatchAction = ILoadCurrentMatchSuccess| ILoadCurrentMatchFailed | IModifyOdd