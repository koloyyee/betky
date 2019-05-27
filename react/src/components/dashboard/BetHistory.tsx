import * as React from 'react';
import { Table } from 'antd';
import { IRootState } from '../../store';
import { connect } from 'react-redux';
import { loadHistoryById, loadSelfInfo } from '../../redux/member/thunk';
import { IBetHistory, IMember } from '../../redux/member/state';
import './BetHistory.css'

export interface IBetHistoryProps{
    member:IMember
    betHistory: IBetHistory[]
    loadSelfInfo: ()=>void
    loadHistoryById:()=> void
}


export class SelfBetHistory extends React.Component<IBetHistoryProps>{

    public componentDidMount(){
        this.props.loadSelfInfo()
        this.props.loadHistoryById()
    }
    
    public render() {
        const column =[{
            title:'Win/Lose',
            dataIndex: 'state'
        },
        {
            title:'Match',
            dataIndex: 'matchName'
        },
        {
            title:'Home Team',
            dataIndex: 'homeName'
        },
        {
            title:'Home Team Score',
            dataIndex: 'homeScore'
        },
        {
            title:'Away Team',
            dataIndex: 'awayName'
        },
        {
            title:'Home Team Score',
            dataIndex: 'awayScore'
        },
        {
            title:'Token(gain/loss)',
            dataIndex: 'token'
        },
    ]
        const data= this.props.betHistory.map((history,i)=>({
            key:i,
            state: history.state,
            matchName: history.matchName,
            homeName: history.match.homeName,
            homeScore: history.match.homeScore,
            awayName: history.match.awayName,
            awayScore: history.match.awayScore,
            token:history.token

        }))
        return(
            <div>
                <div className='welcome-banner'>
                <h1>Welcome Back! <br/>
                <span id="member-name">
                {(this.props.member.name).toUpperCase()}
                </span></h1>
                <h2>Here is your records!</h2>
                </div>
                <Table columns={column} dataSource={data} size="middle"/>
            </div>
        )
    }
}

const mapStateToProps = (state:IRootState) =>{
    const betHistory = state.member.betHistory
    const member = state.member.self
    return {betHistory, member}
}

const mapDispatchToProps = {loadHistoryById, loadSelfInfo}

export const ConnectedHistory = connect(mapStateToProps,mapDispatchToProps)(SelfBetHistory)

