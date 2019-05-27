import { submitBetSuccess, failed } from './actions';

describe('Bet actions',  ()=>{
    it('should return bet history',()=>{
        expect((submitBetSuccess(1,1,1,1000))).toEqual({
            type: "SUBMIT_BET_SUCCESS",
            teamId:1,
            matchId:1,
            odd:1,
            token:1000
        })
    })

    it('should failed', ()=>{
        expect(failed('SUBMIT_BET_FAILED','I have failed')).toEqual({
            type:'SUBMIT_BET_FAILED',
            msg: 'I have failed'
        })
    })

})