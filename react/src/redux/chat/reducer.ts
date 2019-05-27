import { IChatState } from './state';
import { IChatAction } from './actions';

const oldState={
    chatHistory:[]
}

export function chatroomReducer(state: IChatState = oldState, action:IChatAction){

    switch(action.type){
        case "LOAD_MESSAGE_SUCCESS":
            return{
                ...state,
                chatHistory: action.chatHistory
            }
        case "SEND_MESSAGE_SUCCESS":
            return{
                ...state,
                message:action.message
            }
        case "RECEIVE_MESSAGE_SUCCESS":
            return{
                ...state,
                memberId:action.memberName,
                message:action.message
            }
        case "ADD_MESSAGE_TO_CHAT_HISTORY":
                return {
                    ...state,
                    chatHistory: state.chatHistory.concat(action.newMessage) 
                }
        case "LOAD_MESSAGE_FAILED":
        case "RECEIVED_MESSAGE_FAILED":
        case "SEND_MESSAGE_FAILED":
        default:
            return state
    }

}