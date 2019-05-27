import * as React from 'react'
import './Login.css'
import { connect } from 'react-redux';
import { IRootState, ThunkDispatch } from '../../store';
import { login, facebookLogin } from '../../redux/auth/actions';
import { ConnectedRegister } from '../register/Register';
import { Button } from 'antd';
// import ReactFacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';


interface ILoginState{
    username:string,
    password:string,
    hasAccount:boolean,
}

interface ILoginProps{
    login: (username:string,password:string)=> void,
}

export class LoginForm extends React.Component<ILoginProps, ILoginState> {
    constructor(props:ILoginProps){
        super(props)
        this.state={
            username:"",
            password:"",
            hasAccount: false
        }
    }

    private login=()=>{
        const {username,password} = this.state;
        if(username && password){
            this.props.login(username,password);
        } 
    }

    private onChange= (event : React.ChangeEvent<HTMLInputElement>)=>{
        this.setState ({
            [event.currentTarget.name] : event.currentTarget.value,
            hasAccount: this.state.hasAccount
        } as Pick<ILoginState, keyof ILoginState>)
    }

    private hasAccount=()=>{
        this.setState({
            hasAccount: !this.state.hasAccount
        })
    }
    private reset = ()=>{
        this.setState({
            username:"",
            password:"",
            hasAccount: false
        })
    }

    public render(){

        return(
            <div>
                {this.state.hasAccount? "":
                <div className = {`login-form`}>
                    <div className ='input-area'>
                        <label htmlFor="username">Username</label>
                        <br/>
                        <input type="text" name="username" placeholder="Your Username" onChange={this.onChange}/>
                    </div>
                    <div className ='input-area'>
                        <label htmlFor='password'>Password</label>
                        <br/>
                        <input type="password" name="password" placeholder="Your Password" onChange={this.onChange}/>
                    </div>
                    <div className="buttons"> 
                       <Button onClick={this.login}>Login</Button> 
                        <Button onReset={this.reset}>Clear </Button>
                    </div>
                    <button onClick={this.hasAccount} >Register!</button>
                    </div> 
                }
                    {/* <div className="fb-button">
                        <ReactFacebookLogin
                            appId={process.env.REACT_APP_FACEBOOK_APP_ID || ''}
                            autoLoad={true}
                            fields="name,email,picture"
                            onClick={this.fBOnCLick}
                            callback={this.fBCallback}
                        />  
                    </div> */}
                {this.state.hasAccount? 
                <div >
                    <ConnectedRegister/> 
                    <button className="login-click"onClick={this.hasAccount} > Login! </button>
                </div>
                : ""}
            </div>

        )

    }
}
const mapStateToProps = (state:IRootState)=>({});

const mapDispatchToProps = (dispatch:ThunkDispatch)=>({
    login: (username:string,password:string)=>dispatch(login(username,password)),
    facebookLogin:(accessToken:string)=>dispatch(facebookLogin(accessToken))
})

export const ConnectedLogin = connect(mapStateToProps,mapDispatchToProps)(LoginForm)
