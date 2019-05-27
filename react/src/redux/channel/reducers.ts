import { IChannelAction } from './actions';
import { IChannelState } from './state';

const oldState = {
    channels:[],
    msg:""
}

export const channelReducer=(state:IChannelState=oldState, action:IChannelAction):IChannelState=> {
    switch(action.type){
       
        case "LOAD_ALL_CHANNEL_SUCCESS":
        return{
            ...state,
            channels:action.channels
        }
        case "LOAD_CHANNEL_FAILED":
            return{
                ...state,
                msg:action.msg
            }
        default:
            return state
    }
}