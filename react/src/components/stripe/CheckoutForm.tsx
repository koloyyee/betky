import * as React from 'react';
import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements';
import './CheckoutForm.css'
import { Button } from 'antd';
import { transaction } from '../../redux/transaction/thunk';
import { ThunkDispatch } from '../../store';
import { connect } from 'react-redux';


export interface ICheckoutFormState {
    iconLoading:boolean
    complete:boolean
    
    
}

export interface ICheckoutFromOwnProps{
        productId:number,
        pricePaid:number,
        tokenReceived:number,
}

export interface ICheckoutFormProps extends ICheckoutFromOwnProps{
    stripe?: ReactStripeElements.StripeProps
    transaction:(productId:number, pricePaid:number, tokenReceived:number, stripeReceivedId:string)=>void
}  

const {REACT_APP_API_SERVER} = process.env

class CheckoutForm  extends React.Component<ICheckoutFormProps, ICheckoutFormState>{
    constructor(props:ICheckoutFormProps){
        super(props)
        this.state={
            iconLoading:false,
            complete:false,
        }
    }

    private onSubmit= async (event:React.FormEvent<HTMLFormElement>)=> {
        if(this.props.stripe){
            const {token} = await this.props.stripe.createToken({name: "Name"});
            if(token){
                await fetch(`${REACT_APP_API_SERVER}/charge`, {
                  method: "POST",
                  headers: {"Content-Type": "application/json"},
                  body: JSON.stringify(token.id)
                });
                    this.props.transaction(this.props.productId,this.props.pricePaid, this.props.tokenReceived, token.id)
                this.setState({
                    complete:true
                })
            }
        }
      }
      
    public render(){
        return(

            <div className="checkout-form" >
                
                <CardElement style={{base: {fontSize: '18px'}}}/>
                <Button  onClick={this.onSubmit} type="primary" >Submit</Button>
                {this.state.complete? <h1>Purchase Complete <small>click X to close</small></h1>: ""}

            </div>
        )
    }
}

const mapDispatchToProps= (dispatch:ThunkDispatch)=>({
    transaction:(productId:number, pricePaid:number, tokenReceived:number, stripeReceivedId:string)=>dispatch(transaction(productId, pricePaid, tokenReceived, stripeReceivedId))
})


 const injectedCheckoutForm =  injectStripe(CheckoutForm)

export const ConnectedCheckoutForm = connect(null, mapDispatchToProps)(injectedCheckoutForm)