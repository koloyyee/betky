import * as React from 'react';
import { ThunkDispatch, IRootState } from '../../store';
import { register } from '../../redux/register/thunk';
import { connect } from 'react-redux';
import'./Register.css'
import { Button } from 'antd';

// register also require thunk and redux
// interact with the database to insert the table
interface IRegisterState{
    username:string,
    password:string,
    email:string,
    isSubmitted:boolean
}

interface IRegisterProps{
    register:(
        username:string,
        password:string,
        email:string,
    )=> void
}

export class Register extends React.Component<IRegisterProps,IRegisterState>{

    constructor(props:IRegisterProps){
        super(props) 
        this.state={
            username:"",
            password:"",
            email:"",
            isSubmitted: false

        }

    }

    private onInputChange = (field: 'username' | 'password'|'email',event:React.ChangeEvent<HTMLInputElement>)=>{
        const state = {}
        state[field] = event.currentTarget.value
        this.setState(state)
    }

    private submit =(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        const {username, password, email} = this.state
        this.setState({isSubmitted:true})
        if(this.state.username !=="" && 
        this.state.email !=="" && 
        this.state.password !=="") {
            this.props.register(username,password,email)
        } else {
            return ;
        }
    }

    private reset=()=>{
        this.setState({
            username:"",
            password:"",
            email:"",
            isSubmitted: false
        })
    }

    public render(){
        
        return (
            <div>
                <form onSubmit={this.submit} className="register-form">
                    <div className="input-area">
                        <label htmlFor="username">Username</label>
                        <br/>
                        <input  type='text' 
                                name="username" 
                                placeholder='Your name' 
                                onChange={this.onInputChange.bind(this,"username")} 
                                value={this.state.username} required={true}/>
                        {this.state.username === ""? "":
                        <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className="input-area">
                        <label htmlFor="email">Email</label>
                        <br/>
                        <input type='email' name='email' placeholder='Your Email' 
                            onChange={this.onInputChange.bind(this,"email")} 
                            value={this.state.email} required={true}/>
                    </div>
                    <div className="input-area">
                        <label htmlFor="password">Password</label>
                        <br/>
                        <input type='password' name='password' placeholder='Your Password (8-16 letters)' 
                            onChange={this.onInputChange.bind(this,"password")} 
                            value={this.state.password}required={true}/>
                    </div>
                    <Button>Register</Button>
                    <Button onReset={this.reset}> Clear </Button>
                </form>
            </div>            
        )
    }
}

const mapStateToProps=(state:IRootState)=>({
        msg:state.register.msg
})

const mapDispatchToProps=(dispatch:ThunkDispatch)=>{
    return{
        register:(username:string, password:string, email:string) => dispatch(register(username, password, email))
    }
}

export const ConnectedRegister = connect(mapStateToProps,mapDispatchToProps)(Register)