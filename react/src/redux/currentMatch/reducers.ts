import { ICurrentMatchState } from './state';
import { ICurrentMatchAction } from './actions';


const oldState ={
    currentMatch:{
        matchId:0,
        matchName:"",
        matchDayTime: new Date(),
        homeBet: 0,
        awayBet: 0,
        homeTeamId: 0,
        homeName: '',
        awayTeamId:0,
        awayName: '',
        homeRatio:0,
        awayRatio:0,
        currentHomeScore:0,
        currentAwayScore:0,
        currentHomeRate:0,
        currentAwayRate:0
    },
    msg:""
}

export  const currentMatchReducer = (state:ICurrentMatchState = oldState, action:ICurrentMatchAction) :ICurrentMatchState =>{

        switch(action.type){
            case 'LOAD_CURRENT_MATCH_SUCCESS':
                return{
                    ...state,
                    currentMatch:action.currentMatch
                }
            case 'LOAD_CURRENT_MATCH_FAILED':
                return{
                    ...state,
                    msg:action.msg
                }
            case 'MODIFY_ODDS': 
                return {
                    ...state,
                    currentMatch: {...state.currentMatch, 
                        currentHomeRate: action.homeOdd,
                        currentAwayRate: action.awayOdd
                    }
                }
            default:
                return state
        }


    

}