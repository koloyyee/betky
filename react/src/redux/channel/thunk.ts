import { ThunkResult } from '../../store';
import { Dispatch } from 'redux';
import { IChannelAction, failed, loadAllChannelSuccess } from './actions';
import { IChannel } from './state';


const {REACT_APP_API_SERVER} = process.env

export function loadChannel(id:number):ThunkResult<void>{
    return async(dispatch:Dispatch<IChannelAction>) =>{
        const res = await fetch(`${REACT_APP_API_SERVER}/channel/${id}`,{
            method: "GET"
        })
        const result = await res.json()
        if(res.status ===200 && result){
            dispatch(loadAllChannelSuccess(result.channel))
        } else {
            dispatch(failed("LOAD_CHANNEL_FAILED", result.e))
        }
    }

}


export function loadAllChannel():ThunkResult<void>{
    return async(dispatch:Dispatch<IChannelAction>) =>{
        const res = await fetch(`${REACT_APP_API_SERVER}/channel`,{
            method:"GET"
        })
        const result:IChannel[]= await res.json()
        if(res.status===200 && result){
            dispatch(loadAllChannelSuccess(result))

        }else{
            dispatch(failed('LOAD_CHANNEL_FAILED', ''))
        }
    
    }
}

