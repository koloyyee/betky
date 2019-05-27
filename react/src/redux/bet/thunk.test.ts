import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock';
import { submitBetSuccess } from './actions';
import { submitBet } from './thunk';

const mockStore = configureMockStore([thunk])

describe('Bet thunks', ()=>{
    it('should place a bet ',  async ()=>{
        // stub return data
        const result ={
            teamId:1,
            matchId:1,
            odd:1,
            token:100
        };
        //mock 
        fetchMock.post(`${process.env.REACT_APP_API_SERVER}/bet`,
            {body:result, status:200}
        );
        // expectation data
        const expectedAction= submitBetSuccess(1, 1, 1, 100)
        const store = mockStore({teamId:0, matchId:0, odd:0, token:0})
        // call method
        await store.dispatch(submitBet(1,1,1,100) as any)
        expect(store.getActions()).toEqual([expectedAction])
    })
})