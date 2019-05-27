import { ThunkResult } from '../../store';
import { Dispatch } from 'redux';
import { IRegisterAction, registerSuccess, failed } from './actions';
import { CallHistoryMethodAction, push } from 'connected-react-router';


const {REACT_APP_API_SERVER} = process.env

export function register(username:string, password:string, email:string):ThunkResult<void>{
    const data = {username, password, email} 
    return async (dispatch:Dispatch<IRegisterAction |CallHistoryMethodAction>) =>{
        const res = await fetch(`${REACT_APP_API_SERVER}/member/register`,{
            method: "POST",
            headers:{
                "Content-type" :"application/json"
            },
            body:JSON.stringify(data)
        })
            const result = await res.json()            
            if(res.status === 200 && result){
                dispatch(registerSuccess())
                dispatch(push(`/match/1`));
            } else {
                dispatch(failed("REGISTER_FAILED", result.e))
            }
    }
}