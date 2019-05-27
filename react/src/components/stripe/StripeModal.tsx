import { Modal, Button } from 'antd';
import * as React from 'react';
import { StripeSection } from './StripeSection';

export interface IStripeModalState{
    visible:boolean
    confirmLoading: boolean
}

export interface IStripModalProps{
  productId:number;
  tokenReceived:number;
  pricePaid:number;
}


export class StripeModal extends React.Component<IStripModalProps,IStripeModalState>  {
  
    constructor(props:IStripModalProps){
        super(props)
        this.state={
            visible: false,
            confirmLoading: false,
        }
    }

  private showModal = () => {
    this.setState({
      visible: true,
    });
  }


 private handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  public render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Take My Money!
        </Button>
        <Modal
          title="Purchase"
          visible={this.state.visible}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
          footer={null}
        >
        <StripeSection productId={this.props.productId} tokenReceived={this.props.tokenReceived} pricePaid={this.props.pricePaid}/>
        </Modal>
      </div>
    );
  }
}
