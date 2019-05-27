import { IMatchState } from './redux/match/state';
import { ITeamState } from './redux/team/state';
import { IBetAction } from './redux/bet/actions';
import { IMatchAction } from './redux/match/actions';
import { ITeamAction } from './redux/team/actions';
import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import { matchReducer } from './redux/match/reducers';
import { teamReducer } from './redux/team/reducers';
import { createLogger } from 'redux-logger';
import { IBetState } from './redux/bet/state';
import { betReducer } from './redux/bet/reducers';
import { IAuthState } from './redux/auth/state';
import { authReducer } from './redux/auth/reducers';
import { IAuthActions } from './redux/auth/actions';
import { IRegisterState } from './redux/register/state';
import { registerReducer } from './redux/register/reducers';
import { IRegisterAction } from './redux/register/actions';
import { connectRouter, RouterState, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { IChannelState } from './redux/channel/state';
import { IChannelAction } from './redux/channel/actions';
import { channelReducer } from './redux/channel/reducers';
import { IChatState } from './redux/chat/state';
import { IChatAction } from './redux/chat/actions';
import { chatroomReducer } from './redux/chat/reducer';
import { ICurrentMatchState } from './redux/currentMatch/state';
import { ICurrentMatchAction } from './redux/currentMatch/actions';
import { currentMatchReducer } from './redux/currentMatch/reducers';
import { IProductAction } from './redux/product/actions';
import { IProductState } from './redux/product/state';
import { productReducer } from './redux/product/reducers';
import { transactionReducer } from './redux/transaction/reducers';
import { ITransactionState } from './redux/transaction/state';
import { ITransactionAction } from './redux/transaction/actions';
import { IMemberAction } from './redux/member/actions';
import { IMemberState } from './redux/member/state';
import { memberReducer } from './redux/member/reducers';


declare global{
    /* tslint:disable:interface-name */
    interface Window{
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__:any
    }
}

export interface IRootState {
    match: IMatchState
    team: ITeamState
    bet: IBetState
    auth:IAuthState
    chat:IChatState
    register: IRegisterState,
    channel:IChannelState
    router: RouterState,
    currentMatch: ICurrentMatchState
    product:IProductState
    transaction:ITransactionState
    member:IMemberState
}

export type IRootAction = IBetAction |
                          IMatchAction |
                          ITeamAction | 
                          IAuthActions |
                          IChatAction|
                          IRegisterAction|
                          IChannelAction|
                          ICurrentMatchAction|
                          IProductAction|
                          ITransactionAction|
                          IMemberAction

export const history = createBrowserHistory();                          

const rootReducer = combineReducers<IRootState>({
    match: matchReducer,
    team: teamReducer,
    bet: betReducer,
    auth: authReducer,
    chat: chatroomReducer,
    register: registerReducer,
    channel:channelReducer,
    currentMatch:currentMatchReducer,
    product:productReducer,
    transaction:transactionReducer,
    member:memberReducer,
    router: connectRouter(history)
})

export type ThunkResult <R> = ThunkAction<R, IRootState, null, IRootAction>
export type ThunkDispatch  = ThunkDispatch<IRootState, null, IRootAction>


const logger = createLogger({
    predicate:(getState, action) => action.type !== "ELAPSE_SECOND"
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default  createStore<IRootState,IRootAction, {},{}>(
    rootReducer,
    composeEnhancers(
        applyMiddleware(logger),
        applyMiddleware(thunk),
        applyMiddleware(routerMiddleware(history))
    )
    
)
