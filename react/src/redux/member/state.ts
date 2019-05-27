
export interface IBetHistory{
    state:string;
    matchDateTime: string;
    match:{
        homeName: string,
        homeScore: number,
        awayName: string,
        awayScore: number 
    }
    token:number;
    matchName:string
}

export interface IRank{
    name : string;
    token:number;
}

export interface IMember{
    name: string;
    token: number;
    email: string
}

export interface IMemberState{
    self:IMember,
    betHistory: IBetHistory[],
    rank:IRank[],
    msg:string
}