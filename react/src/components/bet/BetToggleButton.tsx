import * as React from 'react';
import ConnectSubmitBet from './BetSubmitForm';
import { Drawer, Button } from 'antd';
import './BetToggleButton.less'
import { IRootState, ThunkDispatch } from '../../store';
import { LoginForm } from '../auth/Login';
import { login } from '../../redux/auth/actions';
import { connect } from 'react-redux';

interface IBetToggleFormState {
  visible: boolean
  chosenOdd: number
}


interface IBetToggleFormProps {
  matchId: number
  odds: number
  team: string
  isHome: boolean
  isAuthenticated: boolean
  type: 'primary' | 'danger'
  login:(username:string, password:string)=> void
  toggle: () => void
}


class BetToggleButton extends React.Component<IBetToggleFormProps, IBetToggleFormState> {
  constructor(props: IBetToggleFormProps) {
    super(props);
    this.state = {
      visible: false,
      chosenOdd: 0
    }
  }

  private showDrawer = () => {
    this.props.toggle();
    this.setState({
      visible: true,
      chosenOdd: this.props.odds
    });
  };

  private onClose = () => {
    this.setState({
      visible: false
    })
  }

  private generateTitle = () => {
    return (
      <div className={'titleContainer'} >
        <span>{this.props.team}</span>
        <Button onClick={this.onClose} style={{ marginRight: 8 }} icon="close-circle" shape="circle" type="danger" />
      </div>
    )
  }

  private login=(username:string, password:string) =>{
    this.props.login(username, password)
  }

  public render() {
    return (
      <div className={'bet-toggle'}>

        <Button type={this.props.type}   onClick={this.showDrawer}>
          {this.props.odds}
        </Button>
        <Drawer

          title={this.generateTitle()}
          placement={"right"}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
            <div className={'submitBet'}>
              {this.props.isAuthenticated? 
              <ConnectSubmitBet
              chosenOdd={this.state.chosenOdd}
              matchId={this.props.matchId}
              isHome={this.props.isHome}
              closeDrawer={this.onClose} />:
              
              <LoginForm login={this.login}/> }
            </div>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = (state:IRootState) => {
  return{
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch:ThunkDispatch) =>{
  return ({
    login: (username: string, password: string) => dispatch(login(username, password))
  });
}

export  const ConnectedBetToggleButton = connect(mapStateToProps,mapDispatchToProps)(BetToggleButton)