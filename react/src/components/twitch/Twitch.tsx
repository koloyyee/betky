import * as React from 'react';
import './Twitch.css'
import { ConnectedBet } from '../bet/Bet';
import { match } from 'react-router-dom';
import { Row, Col, Popover, Button } from 'antd';
import { IRootState, ThunkDispatch } from '../../store';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player'
import { ConnectedDonut } from '../polling/Donut';
import { loadCurrentMatch } from '../../redux/currentMatch/thunk';
import { ICurrentMatch } from '../../redux/currentMatch/state';
// import { updateMatchAndScore } from '../../redux/currentMatch/actions';
// import io from 'socket.io-client';


// const {REACT_APP_API_SERVER}= process.env
// export const socket = io(`${REACT_APP_API_SERVER}`)


export interface ITwitchProps {
    match: match<{ id: string }>;
    // history: {
    //     listen: (handler: (location:any) => void) => ()=> void
    // }
    channel: string;
    currentMatchInfo?: ICurrentMatch;
    loadCurrentMatch: (id: number) => void;
    // updateMatchAndScore:(currentMatchInfo:ICurrentMatch)=>void
}

export class Twitch extends React.Component<ITwitchProps>{
    
    // private load:number = 0;

    public componentDidMount() {
        const id = parseInt(this.props.match.params.id, 10)
         this.props.loadCurrentMatch(id)
        //  this.unlisten=this.props.history.listen((location)=>{
        //     const path = location.pathname.split('/')
        //     const lastPath = path[path.length -1 ]
        //     const historyId = parseInt(lastPath, 10)
        //      this.props.loadCurrentMatch(historyId)
        // })
        // this.load = window.setInterval(async()=>{
        //     const id = parseInt(this.props.match.params.id, 10)
        //     await this.props.loadCurrentMatch(id)
        // }, 5000)
        // socket.on('currentMatchInfo', ((data:string)=>{
        //     const {currentMatchInfo} = JSON.parse(data);
        //       this.props.updateMatchAndScore(currentMatchInfo.matchName, currentMatchInfo.currentHomeScore, currentMatchInfo.currentAwayScore)
        //   }))
        //   socket.emit('matchInfo', this.props.match.params.id.toString())
    }


    public render() {
        return (
            <div className={'twitch'}>
                <Row gutter={4}>
                    <Col span={12} >
                        <ReactPlayer key={this.props.channel}
                            url={`https://www.twitch.tv/${this.props.channel}`}
                            playing={true}
                            width='70vw'
                            height='40vw'
                            playsinline={true}
                            pip={true} />
                    </Col>
                </Row>

                <Col offset={4} className={`bet-section`} >
                    <div className='matchName'>{this.props.currentMatchInfo && this.props.currentMatchInfo.matchName} </div>
                    <div className='currentScore'>{this.props.currentMatchInfo && this.props.currentMatchInfo.currentHomeScore} : {this.props.currentMatchInfo && this.props.currentMatchInfo.currentAwayScore}</div>
                    <ConnectedBet
                        key={this.props.match.params.id}
                        matchId={parseInt(this.props.match.params.id, 10)}
                        // history={this.props.history}
                    />
                </Col>
                <Popover placement="top" className='popover' key={this.props.match.params.id} content={<ConnectedDonut  channelId={parseInt(this.props.match.params.id, 10)} />} trigger="click" >
                    <Button>Polling</Button>
                </Popover>
            </div>
        )
    }
}

const mapStateToProps = (state: IRootState, ownProps: ITwitchProps) => {
    const id = parseInt(ownProps.match.params.id, 10);
    const channel = state.channel.channels.find(game => game.id === id)
    const currentMatchInfo = state.currentMatch.currentMatch
    return {
        channel: channel?channel.channel:"",
        currentMatchInfo: currentMatchInfo? currentMatchInfo:undefined
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch) => {
    return ({
        loadCurrentMatch: (id: number) => dispatch(loadCurrentMatch(id)),
        // updateMatchAndScore:(currentMatchInfo:ICurrentMatch)=>dispatch(updateMatchAndScore(currentMatchInfo))
    })
}


export const ConnectedTwitch = connect(mapStateToProps, mapDispatchToProps)(Twitch)