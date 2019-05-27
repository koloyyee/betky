import * as React from 'react';
import { Card, Row, Col } from 'antd';
import { StripeModal } from './StripeModal';
import { IRootState } from '../../store';
import { loadProduct } from '../../redux/product/thunk';
import { connect } from 'react-redux';
import { IProduct } from '../../redux/product/state';
import './ShopCard.css'
const { Meta } = Card;

export interface IShopCardProps{
    products:IProduct[]
    loadProduct:()=>void
}

export class ShopCard extends React.Component<IShopCardProps>{


    public componentDidMount(){
        this.props.loadProduct()
    }
    public render(){
        return(
            <div className={'shop-cards'}>
            <Row gutter={24} type="flex" justify="space-around" align="middle" >
                {this.props.products.map((product,i)=>
                <Col key={i} className="gutter-row" offset={2} span={6}
                xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
 
                     <Card
                     key={i}
                     hoverable
                     style={{ width: 240 }}
                     cover={<img alt="example" src="https://goldiraguide.org/wp-content/uploads/2014/05/Augustus-Saint-Gaudens.jpg" />}
                 >
                     <Meta
                     title= {product.package}
                     description= {`$`+product.price+ ` for `+ product.token + ` tokens`}
                     />
                     <StripeModal productId={product.id} tokenReceived={product.token} pricePaid={product.price}/>
                 </Card>
                 </Col>
                    )}
            </Row>
            </div>
            
        )

    }
}

const mapStateToProps = (state:IRootState)=>{
    const products = state.product.products
    return {products}
}

const mapDispatchToProps={
        loadProduct
}

export const ConnectedShopCard = connect(mapStateToProps, mapDispatchToProps)(ShopCard)