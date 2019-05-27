import * as React from 'react';
import { ConnectedBetToggleButton } from './BetToggleButton';
import './BetButton.css'

export interface IBetButtonState {
    collapse: boolean,
    clicked: string
    
}

export interface IBetButtonProps {
    matchId:number
    home: string;
    homeOdds: number
    away: string;
    awayOdds: number;
}

export class BetButton extends React.Component<IBetButtonProps, IBetButtonState>{
    constructor(props: IBetButtonProps) {
        super(props)
        this.state = {
            collapse: false,
            clicked: ''
        }
    }


    private homeIsClicked = () => {
        this.setState({
            clicked: 'home'
        })
    }
    private awayIsClicked = () => {
        this.setState({
            clicked: 'away'
        })
    }

    public render() {
        return (
            <div className="home-or-away-team">
                <div className="team-button" id="home">
                    <span>{this.props.home}</span>
                    <ConnectedBetToggleButton type={'primary'} team={this.props.home} matchId={this.props.matchId} toggle={this.homeIsClicked} isHome={this.state.clicked === 'home'}  odds={this.props.homeOdds} />
                </div>  
                <div className="team-button"  id="away">
                    <span> {this.props.away}</span>
                    <ConnectedBetToggleButton  type={"danger"} team={this.props.away} matchId={this.props.matchId} toggle={this.awayIsClicked} isHome={this.state.clicked === 'home'} odds={this.props.awayOdds} />
                </div>
            </div>
        )
    }
}

