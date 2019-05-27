import { IBetHistory, IRank, IMember } from './state';

type LOAD_SELF_SUCCESS = 'LOAD_SELF_SUCCESS'
type LOAD_HISTORY_BY_ID_SUCCESS = 'LOAD_HISTORY_BY_ID_SUCCESS'
type LOAD_RANKING_SUCCESS = 'LOAD_RANKING_SUCCESS'
type FAILED ="LOAD_HISTORY_BY_ID_FAILED" | "LOAD_RANKING_FAILED" | "LOAD_SELF_FAILED"

export function loadSelfInfoSuccess(self:IMember):ILoadSelfSuccess{
    return{
        type: 'LOAD_SELF_SUCCESS',
        self
    }
}

export function loadHistoryByIdSuccess(betHistory: IBetHistory[] ):ILoadHistoryByIdSuccess{
    return{
        type: 'LOAD_HISTORY_BY_ID_SUCCESS',
        betHistory
    }
}
export function loadRankingSuccess(rank:IRank[]):ILoadRankingByIdSuccess{
    return{
        type: 'LOAD_RANKING_SUCCESS',
        rank
    }
}

export function failed (type:FAILED, msg:string):IFailedAction{
    return {
        type,
        msg
    }

}
interface ILoadSelfSuccess {
    type: LOAD_SELF_SUCCESS;
    self:IMember
}

interface ILoadHistoryByIdSuccess {
    type: LOAD_HISTORY_BY_ID_SUCCESS;
    betHistory:IBetHistory[]
}

interface ILoadRankingByIdSuccess {
    type: LOAD_RANKING_SUCCESS;
    rank:IRank[]
}

interface IFailedAction {
    type: FAILED;
    msg:string
}

export type IMemberAction = ILoadHistoryByIdSuccess|
                            ILoadRankingByIdSuccess|
                            ILoadSelfSuccess|
                           IFailedAction
