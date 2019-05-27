import * as React from 'react';
import { submitBet } from '../../redux/bet/thunk';
import { connect } from 'react-redux';
import { IRootState, ThunkDispatch } from '../../store';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Select, Button } from 'antd'
import { loadMatchById } from '../../redux/match/thunk';

const Option = Select.Option

export interface IBetSubmitFormState {
    token: number

}

export interface IBetSubmitFormOwnProps {
    isHome: boolean;
    matchId: number;
    chosenOdd: number;
    closeDrawer: () => void;
}

export interface IBetSubmitFormProps extends IBetSubmitFormOwnProps {
    teamId: number;
    odd: number;
    submitBet: (teamId: number, odd: number, matchId: number, token: number) => void
}

export class BetSubmitForm extends React.Component<IBetSubmitFormProps & RouteComponentProps, IBetSubmitFormState>{
    constructor(props: IBetSubmitFormProps & RouteComponentProps) {
        super(props)
        this.state = {
            token: 100
        }
    }

    private submit = () => {
        this.props.submitBet(this.props.teamId, this.props.matchId, this.props.odd, this.state.token)
        this.props.closeDrawer();
    }

    private onChange = (value:{ key:string }) => {
        this.setState({
            token: parseInt(value.key, 10)
        })
    }

    public render() {
        return (
            <div>
                <div>
                    <span> {this.props.chosenOdd}</span>
                </div>
                <Select labelInValue={true} defaultValue={{ key : this.state.token.toString()}} onChange={this.onChange}>
                    <Option value="100">100</Option>
                    <Option value="200">200</Option>
                    <Option value="400">400</Option>
                    <Option value="1000">1000</Option>
                </Select>
                
                <Button onClick={this.submit} type="primary">
                    Submit
            </Button>
            </div>
        )
    }
}
// use this whenever you need to use a thunk function, 
// when you need to change the state

// ownProps down below will specifically point to the state or component directly above the current component
// without writing down the "ownProps", redux will automatically search for the States at the redux store,
// in this case it is the IRootState. 
const mapStateToProps = (state: IRootState, ownProps: IBetSubmitFormOwnProps) => {

    const odd = (ownProps.isHome) ? state.currentMatch.currentMatch.currentHomeRate : state.currentMatch.currentMatch.currentAwayRate;
    const teamId = (ownProps.isHome) ? state.currentMatch.currentMatch.homeTeamId : state.currentMatch.currentMatch.awayTeamId;
    return { teamId, odd }
}

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
    submitBet: (teamId: number, matchId: number, odd: number, token: number) => dispatch(submitBet(teamId, matchId, odd, token)),
    loadMatchById: (matchId: number) => dispatch(loadMatchById(matchId))
})

const ConnectSubmitBet = connect(mapStateToProps, mapDispatchToProps)(BetSubmitForm)


export default withRouter(ConnectSubmitBet)
