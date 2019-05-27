import * as React from 'react';
import { Table } from 'antd';
import { IRootState } from '../../store';
import { IRank } from '../../redux/member/state';
import { loadRank } from '../../redux/member/thunk';
import { connect } from 'react-redux';
import './Ranking.css'

export interface IRankState{
    data:[]
}
export interface IRankProps{
    rank:IRank[]
    loadRank:()=>void
}


export class RankingList extends React.Component<IRankProps,IRankState>{

    constructor(props:IRankProps){
        super(props)
        this.state={
            data:[]
        }
    }
    public componentDidMount(){
        this.props.loadRank()
    }
    public render() {
        const columns=[{
            title:'Name',
            dataIndex: 'name'
        },
        {
            title:"Token",
            dataIndex:"token"
        }]
        const data = this.props.rank.map((info, i)=>({key:i , name:info.name, token:info.token}))
        return(
            <Table columns={columns} dataSource={data} size="middle" />
        )
    }
}

const mapStateToProps = (state:IRootState) =>{
    const  rank = state.member.rank
    return {rank}
}

const mapDispatchToProps = {loadRank}

export const ConnectedRank = connect(mapStateToProps,mapDispatchToProps)(RankingList)

