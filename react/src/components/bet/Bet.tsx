import * as React from 'react';
import { BetButton } from './BetButton';
import './Bet.css'
import { IRootState, ThunkDispatch } from '../../store';
import { connect } from 'react-redux';
import { loadCurrentMatch } from '../../redux/currentMatch/thunk';
import { ICurrentMatch } from '../../redux/currentMatch/state';
import { modifyOdds, loadCurrentMatchSuccess } from '../../redux/currentMatch/actions';
import io from 'socket.io-client';


const {REACT_APP_API_SERVER}= process.env
export const socket = io(`${REACT_APP_API_SERVER}`)



export interface IBetProps {
    home: ICurrentMatch;
    away: ICurrentMatch;
    loadCurrentMatchSuccess:(currentMatch:ICurrentMatch)=>void;
    loadCurrentMatch: (id:number) => void;
    modifyOdds: (homeOdd: number, awayOdd: number) => void;

    matchId: number
}

export class Bet extends React.Component<IBetProps, {}>{

    // private unlisten: ()=>void  = ()=>null;
    // private autoLoad: number = 0;

    public async componentDidMount() {
        const { matchId } = this.props;
        await this.props.loadCurrentMatch(matchId)
       
        // this.autoLoad = window.setInterval(async()=>{
        //     this.props.loadCurrentMatch(this.props.matchId)

        // }, 5000)
        // socket.on("oddChange", ((data:string)=>{
        //     const { odd } = JSON.parse(data);
        //     this.props.modifyOdds(parseFloat(odd.home), parseFloat(odd.away))
        // }) )

        socket.on("infoChange", ((data:any)=>{
            
            this.props.loadCurrentMatchSuccess(data)
        }) )

        socket.emit('matchInfo', matchId.toString())
        
    }

    public async componentWillUnmount(){
        // this.unlisten()
        // clearInterval(this.autoLoad)
    }

   
    public render() {
        return (

            <BetButton 
                key={this.props.matchId}
                matchId={this.props.matchId}
                home={this.props.home.homeName}
                away={this.props.away.awayName}
                homeOdds={this.props.home.currentHomeRate}
                awayOdds={this.props.away.currentAwayRate} />
        )
    }
}

const mapStateToProps = (state: IRootState) => {
    
        const home = state.currentMatch.currentMatch
        const away = state.currentMatch.currentMatch
        return {
            home,
            away
        }  
}
const mapDispatchToProps = (dispatch: ThunkDispatch) => {
    return {
        loadCurrentMatch:(id:number)=>dispatch(loadCurrentMatch(id)),
        modifyOdds: (home: number, away:number) => dispatch(modifyOdds(home, away)),
        loadCurrentMatchSuccess:(currentMatch:ICurrentMatch)=>dispatch(loadCurrentMatchSuccess(currentMatch))
    }

}

export const ConnectedBet = connect(mapStateToProps, mapDispatchToProps)(Bet)