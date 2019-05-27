import * as React from 'react';
import { ConnectedShopCard } from '../components/stripe/ShopCard';

export class Shop extends React.Component<{}>{

    public render(){
        return(
            <div>
                <ConnectedShopCard />
            </div>
        )

    }
}