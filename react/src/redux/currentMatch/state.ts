export interface ICurrentMatch {
    matchId:number;
    matchName:string;
    matchDayTime: Date;
    homeBet: number;
    awayBet: number;
    homeTeamId: number;
    homeName: string;
    awayTeamId:number;
    awayName: string;
    homeRatio:number;
    awayRatio:number;
    currentHomeScore:number;
    currentAwayScore:number;
    currentHomeRate:number;
    currentAwayRate:number;
}
export interface ICurrentMatchState{
    currentMatch:ICurrentMatch
    msg:string
}