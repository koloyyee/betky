
export interface IChannel {
    id:number;
    game:string;
    channel:string;
}

export interface IChannelState{
    channels:IChannel[]
    msg:string
}
