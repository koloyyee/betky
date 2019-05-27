import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Cell,
} from 'recharts';
import { ThunkDispatch, IRootState } from '../../store';
import { loadCurrentMatch } from '../../redux/currentMatch/thunk';
import { connect } from 'react-redux';
import './Donut.css'
import { RouteComponentProps, withRouter } from 'react-router-dom';


export interface IDonutOwnProps {
  channelId: number
}

export interface IDonutProps extends IDonutOwnProps {
  homeName: string;
  awayName: string;
  homeBet: number;
  awayBet: number;
  loadCurrentMatch: (id: number) => void
}

const COLORS = ['#1da57a', '#f52a35'];


export default class Donut extends PureComponent<IDonutProps & RouteComponentProps<{}>>{
  private intervalId?: NodeJS.Timeout ;

  public componentDidMount() {
    this.intervalId = setInterval(() => {
      this.props.loadCurrentMatch(this.props.channelId)
    }, 5000);
    this.props.loadCurrentMatch(this.props.channelId)
  }

  public componentWillUnmount(){
    if(this.intervalId){
      clearInterval(this.intervalId);
    }
  }

  public render() {
    const data = [{ name: this.props.homeName, value: this.props.homeBet },
    { name: this.props.awayName, value: this.props.awayBet }]

    return (
      <div className='poll-info'>
        <div className="home-team-poll">
          {`Team: ` + this.props.homeName}
          <div className="team-color" id='home-color' />
          <div className='bet-pool'>{`Bet Placed: ` + this.props.homeBet}</div>
        </div>
        <div className="away-team-poll" >
          {`Team: ` + this.props.awayName}
          <div className="team-color" id='away-color' />
          <div className='bet-pool'>{`Bet Placed: ` + this.props.awayBet}</div>
        </div>
        <PieChart width={250} height={350}>
          <Pie
            data={data}
            cx={120}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {
              data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            }

          </Pie>

        </PieChart>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  if (state.currentMatch.currentMatch) {
    const { homeName, homeBet, awayName, awayBet } = state.currentMatch.currentMatch
    return {
      homeName, homeBet, awayBet, awayName
    }
  } else {
    return {
      homeName: "",
      homeBet: 0,
      awayName: "",
      awayBet: 0
    }
  }

}

const mapDispatchToProps = (dispatch: ThunkDispatch) => {
  return ({
    loadCurrentMatch: (id: number) => dispatch(loadCurrentMatch(id))
  })
}

export const ConnectedDonut = withRouter(connect(mapStateToProps, mapDispatchToProps)(Donut))