import { ThunkResult } from '../../store';
import { Dispatch } from 'redux';
import { IMatch } from './state';
import { IMatchAction, failed, loadComingMatchSuccess, loadMatchByIdSuccess, } from './actions';

const { REACT_APP_API_SERVER } = process.env




export function loadMatchById(matchId: number): ThunkResult<void> {
    return async (dispatch: Dispatch<IMatchAction>) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/match/${matchId}`, {
            method: "GET"
        });
        const result: IMatch = await res.json()
        if (res.status === 200 && result) {
            dispatch(loadMatchByIdSuccess(matchId, result))
            // dispatch team thunk load team by id
        } else {
            dispatch(failed("LOAD_CURRENT_MATCH_FAILED", ''))
        }
    }
}


export function loadComingMatch(date: Date, match: IMatch): ThunkResult<void> {
    return async (dispatch: Dispatch<IMatchAction>) => {
        const data = { date, match }

        const res = await fetch(`${REACT_APP_API_SERVER}/team/${date}`, {
            method: "GET",
            body: JSON.stringify(data)
        });
        const result = await res.json()
        if (res.status === 200 && result.success) {
            dispatch(loadComingMatchSuccess(date, match))
        } else {
            dispatch(failed("LOAD_CURRENT_MATCH_FAILED", result.e))
        }
    }
}
