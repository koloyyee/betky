export interface ITeam{
    teamName: string;
    odd:number
    teamId: number;
}


export interface IMatch {
       matchName: string;
       matchId: number;
       home: ITeam,
       away: ITeam,
       date:Date
}
export interface IMatchState{
    match: IMatch
    failedMsg: string
}