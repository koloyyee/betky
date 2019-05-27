import { ThunkResult } from '../../store';
import { Dispatch } from 'redux';
import { IMemberAction, failed, loadRankingSuccess, loadHistoryByIdSuccess, loadSelfInfoSuccess } from './actions';
import { IRank, IMember } from './state';


const { REACT_APP_API_SERVER } = process.env

export function loadSelfInfo():ThunkResult<void>{
    return async (dispatch:Dispatch<IMemberAction>)=>{
        const res = await fetch(`${REACT_APP_API_SERVER}/member`, {
            method: "GET",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        });
        const result:IMember = await res.json()
        if(res.status===200 && result ){
            dispatch(loadSelfInfoSuccess(result))
        } else {
            dispatch(failed('LOAD_SELF_FAILED', 'Check your status'))
        }
    }
}


export function loadHistoryById(): ThunkResult<void> {
    return async (dispatch: Dispatch<IMemberAction>) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/current-member/bet-history`, {
            method: "GET",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        });
        const result = await res.json()
        if (res.status === 200 && result) {
            dispatch(loadHistoryByIdSuccess(result.data))
            // dispatch team thunk load team by id
        } else {
            dispatch(failed('LOAD_HISTORY_BY_ID_FAILED', 'Double Check Member ID/Server '))
        }
    }
}


export function loadRank(): ThunkResult<void> {
    return async (dispatch: Dispatch<IMemberAction>) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/current-member/bet-ranking`, {
            method: "GET",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`

            }
        });
        const result: IRank[] = await res.json()
        if (res.status === 200 && result) {
            dispatch(loadRankingSuccess(result))
        } else {
            dispatch(failed('LOAD_RANKING_FAILED', 'Ranking has failed to load '))
        }
    }
}
