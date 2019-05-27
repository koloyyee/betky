export interface IBet {
    teamId: number,
    matchId : number,
    odd: number,
    token : number
}

export interface IBetState {
    bets: IBet
    msg: string
}
