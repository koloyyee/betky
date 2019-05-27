import { ThunkResult, ThunkDispatch } from '../../store';
import { submitBetSuccess, failed, IBetAction, loadBetHistorySuccess, cancelBetSuccess, loadOddsSuccess } from './actions';
import { Dispatch } from 'redux';
import { IBet } from './state';


const {REACT_APP_API_SERVER} = process.env

export function submitBet(teamId:number, matchId:number ,odd:number, token:number):ThunkResult<void>{
    return async(dispatch:ThunkDispatch) =>{
        const data = {teamId, matchId, odd, token}

        const res = await fetch(`${REACT_APP_API_SERVER}/bet`, {
            method: "POST",
            headers: {
                "Content-type" :"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data),
        });
            const result:IBet = await res.json()
            if(res.status === 200 && result){
                dispatch(submitBetSuccess(result.teamId, result.matchId, result.odd, result.token))
            } else {
                dispatch(failed("SUBMIT_BET_FAILED", 'Submit Bet Failed'))
            }
        }  
    }
    
export function loadBetHistory():ThunkResult<void>{
    return async(dispatch:Dispatch<IBetAction>) =>{
        const res = await fetch(`${REACT_APP_API_SERVER}/bet`,{
            method: "GET"
        })
        const result = await res.json()
        if(res.status ===200 && result.success){
            dispatch(loadBetHistorySuccess(result.data))
        } else {
            dispatch(failed("LOAD_BET_HISTORY_FAILED", result.e))
        }
    }
}

export function cancelBet():ThunkResult<void>{
    return async(dispatch:Dispatch<IBetAction>) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/bet`, {
            method: "DELETE"
        })
        const result = await res.json()
        if(res.status === 200 && result.success){
            dispatch(cancelBetSuccess())
        } 
    }
}

export function loadOdds():ThunkResult<void>{
    return async(dispatch:Dispatch<IBetAction>)=>{
        const res = await fetch(`${REACT_APP_API_SERVER}/odd`,{
            method : "GET"
        })
        const result = await res.json()
        if(res.status === 200 && result.success){
            dispatch(loadOddsSuccess(result.data))
        } else {
            dispatch(failed("LOAD_ODDS_FAILED", result.e))
        }
    }
}