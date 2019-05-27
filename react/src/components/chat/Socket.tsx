import io from 'socket.io-client';
import * as React from 'react';
import { sendMessage, loadMessage } from '../../redux/chat/thunk';
import { IChat } from '../../redux/chat/state';
import { addMessageToChatHistory } from '../../redux/chat/actions';
import { connect } from 'react-redux';
import { ThunkDispatch, IRootState } from '../../store';
import './Socket.css'
import { Affix, Button } from 'antd';
import { LoginForm } from '../auth/Login';
import { login } from '../../redux/auth/actions';

const {REACT_APP_API_SERVER} = process.env
export const socket = io(`${REACT_APP_API_SERVER}`)

interface ISocketState{
    message:string
    isSelf:boolean
}

interface ISocketProps{
    chatHistory: IChat[]
    isAuthenticated:boolean
    sendMessage: (message:string)=>void 
    addMessageToChatHistory: (newMessage: IChat) => void
    loadMessage: ()=>void
    login:(username:string, password:string)=> void
  
}


class SocketChatroom extends React.Component<ISocketProps,ISocketState>{

    constructor(props:ISocketProps){
        super(props)
        this.state={
            message: "",
            isSelf:false
        }
       
    }

    public componentDidMount() {
        socket.on('messageToAll', ((newMessage: IChat)=>{
            this.props.addMessageToChatHistory(newMessage);
        }))
        document.addEventListener('scroll', this.scrollToBottom)
    }

    public componentWillUnmount() {
        document.removeEventListener('scroll', this.scrollToBottom);
      }

    // private isBottom(ele:HTMLElement){
    //     return ele.getBoundingClientRect().bottom<= window.innerHeight;
    // }

    private scrollToBottom = ()=>{
        const wrappedEle = document.getElementById('chatroom');
        if(wrappedEle){
            // if(this.isBottom(wrappedEle)){
            //     document.removeEventListener('scroll', this.scrollToBottom);
            // }
            
            wrappedEle.scrollTop = wrappedEle.scrollHeight
        }
    }

    private sendMessage= async ()=>{
        if(this.state.message !== "" ){
            await this.props.sendMessage(this.state.message)
            this.setState({
                message: "",
                isSelf:!this.state.isSelf
            })
            this.scrollToBottom()

        }
    }
    private sendMessagePressEnter= async (event:React.KeyboardEvent)=>{
        if(this.state.message !== "" && event.key === 'Enter'){
            await this.props.sendMessage(this.state.message)
            this.setState({
                message: "",
                isSelf:!this.state.isSelf
            })
            this.scrollToBottom()

        }
    }
    

    private inputOnChange =(event:React.ChangeEvent<HTMLInputElement>) =>{
        this.setState({
            message: event.currentTarget.value
        })
    }

    private login=(username:string, password:string) =>{
        this.props.login(username, password)
      }

    public render (){
        const { chatHistory } = this.props;
        return(
            <Affix className='affix'>
                <div className="socket-chat">
                    <ul id="chatroom">
                        {chatHistory && chatHistory.map(({message, member},i)=>{
                            return(<li className={'message'} key={i}><span className={"member_name "} >{member}</span><span className="member_message">{message}</span></li>)
                        })}
                    </ul>
                    {this.props.isAuthenticated?
                    <div className ='input-and-send'>
                    <input id ="input-area" type='text' 
                    key={'input-area'}
                    onChange={this.inputOnChange} 
                    value={this.state.message} 
                    onKeyPress={this.sendMessagePressEnter}
                    autoFocus={true}/>

                    <Button type='default' 
                    id="send-button"  
                    onClick={this.sendMessage}>send</Button>
                </div> :
                <LoginForm login={this.login}/>
                }
                    
                </div>
            </Affix>
            
        )
    }
}

const mapStateToProps = (state:IRootState)=>{
    const {chatHistory} = state.chat
    const {isAuthenticated} = state.auth
    return { chatHistory , isAuthenticated}
}

const mapDispatchToProps = (dispatch:ThunkDispatch)=>{
    return({
        sendMessage: (message:string)=>dispatch(sendMessage(message)),
        addMessageToChatHistory: (newMessage: IChat) => dispatch(addMessageToChatHistory(newMessage)),
        loadMessage:()=>dispatch(loadMessage()),
        login: (username: string, password: string) => dispatch(login(username, password))

    })
}

export const ConnectedSocketChatroom = connect(mapStateToProps,mapDispatchToProps)(SocketChatroom)