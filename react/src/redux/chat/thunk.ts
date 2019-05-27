import { ThunkResult, ThunkDispatch } from '../../store';
import { sendMessageSuccess, failed, loadMessageSuccess } from './actions';


const {REACT_APP_API_SERVER} =  process.env

export function sendMessage(message:string):ThunkResult<void>{
    return async(dispatch:ThunkDispatch)=>{
        const data = { message}
        const res = await fetch(`${REACT_APP_API_SERVER}/chat`, {
            method:"POST",
            headers: {
                "Content-type" :"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        })
        const result = await res.json()
        if(res.status===200){
            dispatch(sendMessageSuccess(result.message))
        } else {
            dispatch(failed("SEND_MESSAGE_FAILED", result.e))
        }
        
    }
}

export function loadMessage():ThunkResult<void>{
    return async(dispatch:ThunkDispatch)=>{
        const res = await fetch(`${REACT_APP_API_SERVER}/chat`,{
            method: "GET",
        })
        const result = await res.json()
        if(res.status === 200){
            dispatch(loadMessageSuccess(result.chatHistory))
        }
        
    }
}