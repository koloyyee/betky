import { IChatHistory, IChat } from './state';


type LOAD_MESSAGE_SUCCESS = 'LOAD_MESSAGE_SUCCESS'
type SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS'
type RECEIVED_MESSAGE_SUCCESS = 'RECEIVE_MESSAGE_SUCCESS'
type ADD_MESSAGE_TO_CHAT_HISTORY = 'ADD_MESSAGE_TO_CHAT_HISTORY'
type FAILED = 'LOAD_MESSAGE_FAILED' | "SEND_MESSAGE_FAILED" | "RECEIVED_MESSAGE_FAILED"

export function loadMessageSuccess(chatHistory: IChatHistory):ILoadMessageSuccess{
    return{
        type:  'LOAD_MESSAGE_SUCCESS',
        chatHistory
    }
}

export function sendMessageSuccess(message:string):ISendMessageSuccess{
    return{
        type:  'SEND_MESSAGE_SUCCESS',
        message
    }
}

export function receivedMessageSuccess(memberName:string, message:string):IReceivedMessageSuccess{
    return {
        type: "RECEIVE_MESSAGE_SUCCESS",
        memberName,
        message
    }
}

export function addMessageToChatHistory(newMessage: IChat): IAddMessageToChatHistorySuccess {
    return {
        type: "ADD_MESSAGE_TO_CHAT_HISTORY",
        newMessage
    }
}


export function failed(type:FAILED, failedMsg:string):IFailedAction{
    return{
        type,
        failedMsg
    }
}

interface ILoadMessageSuccess{
    type:LOAD_MESSAGE_SUCCESS,
    chatHistory: IChatHistory
}
interface ISendMessageSuccess{
    type: SEND_MESSAGE_SUCCESS,
    message:string
}
interface IReceivedMessageSuccess{
    type: RECEIVED_MESSAGE_SUCCESS,
    memberName:string,
    message:string
}
interface IFailedAction{
    type:FAILED
    failedMsg:string
}

interface IAddMessageToChatHistorySuccess{
    type: ADD_MESSAGE_TO_CHAT_HISTORY
    newMessage: IChat
}
export type IChatAction = ILoadMessageSuccess|
                                ISendMessageSuccess|
                                IReceivedMessageSuccess|
                                IFailedAction |
                                IAddMessageToChatHistorySuccess