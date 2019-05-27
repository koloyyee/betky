import { IBet } from './state';
import { IMatchState } from '../match/state';

type LOAD_BET_HISTORY_SUCCESS = "LOAD_BET_HISTORY_SUCCESS";
type SUBMIT_BET_SUCCESS = "SUBMIT_BET_SUCCESS"
type CANCEL_BET = "CANCEL_BET";
type LOAD_ODDS = "LOAD_ODDS";
type FAILED = "SUBMIT_BET_FAILED" | "LOAD_BET_HISTORY_FAILED" | "LOAD_ODDS_FAILED";


export function submitBetSuccess(teamId: number, matchId: number, odd: number, token: number): ISubmitBetSuccess {

    return {
        type: "SUBMIT_BET_SUCCESS",
        teamId,
        matchId,
        odd,
        token
    }
}

export function cancelBetSuccess():ICancelBet{
    return { type: "CANCEL_BET" }
}

export function loadOddsSuccess(odd: IMatchState):ILoadOddsSuccess{
    return {
        type: "LOAD_ODDS",
        odd
    }
}

export function loadBetHistorySuccess(bets: IBet):ILoadBetHistorySuccess {
    return {
        type: "LOAD_BET_HISTORY_SUCCESS",
        bets
    }
}

export function failed(type: FAILED, msg: string):IFailedAction {
    return {
        type,
        msg
    }
}

interface ISubmitBetSuccess {
    type: SUBMIT_BET_SUCCESS,
    teamId: number,
    matchId: number,
    odd: number,
    token: number
}

interface ICancelBet {
    type: CANCEL_BET,

}

interface ILoadOddsSuccess {
    type: LOAD_ODDS,
    odd: IMatchState
}

interface ILoadBetHistorySuccess {
    type: LOAD_BET_HISTORY_SUCCESS,
    bets: IBet
}

interface IFailedAction {
    type: FAILED,
    msg: string
}
export type IBetAction = IFailedAction | 
                         ICancelBet | 
                         ISubmitBetSuccess | 
                         ILoadBetHistorySuccess |
                         ILoadOddsSuccess

