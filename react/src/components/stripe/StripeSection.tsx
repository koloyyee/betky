import * as React from 'react';
import {StripeProvider, Elements} from 'react-stripe-elements';
import  {ConnectedCheckoutForm}  from './CheckoutForm';
import './Stripe.css'

export interface IStripeSectionProps{
    productId:number;
    tokenReceived:number;
    pricePaid:number;
}


export class StripeSection extends React.Component<IStripeSectionProps>{

    public render(){
        return (
            <StripeProvider apiKey="pk_test_nWcSjqS5UXnKEy3sJnz4lt3W00MnFw8N4p">
                <Elements>
                    <ConnectedCheckoutForm productId={this.props.productId} tokenReceived={this.props.tokenReceived} pricePaid={this.props.pricePaid}/>
                </Elements>
            </StripeProvider>
        )
    }

}
