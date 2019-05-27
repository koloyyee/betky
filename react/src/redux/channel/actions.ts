import {IChannel } from './state';

type LOAD_ALL_CHANNEL_SUCCESS = "LOAD_ALL_CHANNEL_SUCCESS";
type FAILED = "LOAD_CHANNEL_FAILED";


export function loadAllChannelSuccess(channels:IChannel[]): ILoadAllChannelsSuccess {

    return {
        type: "LOAD_ALL_CHANNEL_SUCCESS",
        channels
    }
}

export function failed(type: FAILED, msg: string):IFailedAction {
    return {
        type,
        msg
    }
}


interface ILoadAllChannelsSuccess{
    type: LOAD_ALL_CHANNEL_SUCCESS
    channels:IChannel[]
}


interface IFailedAction {
    type: FAILED,
    msg: string
}
export type IChannelAction = IFailedAction | 
                        ILoadAllChannelsSuccess

