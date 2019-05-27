import { Dispatch } from 'redux';
import { ICurrentMatchAction, loadCurrentMatchSuccess, failed } from './actions';
import { ICurrentMatch } from './state';
import { ThunkResult } from '../../store';



const {REACT_APP_API_SERVER} = process.env

export const loadCurrentMatch =  (id:number):ThunkResult<void> =>{
    return async (dispatch:Dispatch<ICurrentMatchAction>)=>{

        const res = await fetch(`${REACT_APP_API_SERVER}/current/match/${id}`, {
            method: "GET",
            headers:{
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }

        })
        const result:ICurrentMatch = await res.json()
        if(res.status===200 && result){
            dispatch(loadCurrentMatchSuccess(result))
        }else{
            dispatch(failed('Failed to load current match information'))
        }
    }
}