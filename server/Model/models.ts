export interface MatchTeamModel {
    teamName: string;
    teamId: number;
    odd: number;
    matchId: number;
    is_home: boolean
}

export interface MatchModel {
    home: {}
    away: {}
    matchId: number
    date: Date
}

export interface MemberModel {
    username: string;
    password: string;
    email: string;
    token?: number
}

export interface CleanOddModel {
    match_date_time: Date,
    match_name: string,
    home_team_name: string,
    home_team_rate: number,
    away_team_name: string,
    away_team_rate: number
}
export interface CleanResultModel {
    match_name: string,
    home_team_name: string,
    away_team_name: string,
    home_team_won: boolean
}
export interface GameHistoryModel {
    home_team_won: boolean,
    match_id: number
}

export interface TeamModel {
    team_name: string
}

export interface TotalBetHistoryModel {
    game_history_id: number,
    bet_id: number,
    payout: number
}

export interface MatchId_TeamIdModel {
    teamId: number,
    matchId: number
}
export interface BetModel {
    member_id: number,
    team_id: number,
    match_id: number,
    token: number,
    odd: number
}
export interface NewBetModel {
    team_id: number,
    match_id: number,
    token: number,
    odd: number
}
export interface NewMatchModel {
    home_team_id: number,
    away_team_id: number,
    match_name: string,
    match_date_time: Date,
    channel_id: number,
    current_home_score: number,
    current_away_score: number,
    is_finished: boolean
}

export interface NewOddModel {
    match_id: number,
    team_id: number,
    rate: number
}

export interface TeamId_Name_Model {
    team_name: string,
    team_id: number
}

export interface MatchWithHomeIdModel {
    match_date_time: Date,
    match_name: string,
    home_team_name: string,
    home_team_rate: number,
    away_team_name: string,
    away_team_rate: number,
    home_team_id: number
}

export interface MatchWithTeamIdModel {
    match_date_time: Date,
    match_name: string,
    home_team_name: string,
    home_team_rate: number,
    away_team_name: string,
    away_team_rate: number,
    home_team_id: number,
    away_team_id: number
}

export interface MatchWIthAllIdModel {
    match_date_time: Date,
    match_name: string,
    home_team_name: string,
    home_team_rate: number,
    away_team_name: string,
    away_team_rate: number,
    home_team_id: number,
    away_team_id: number,
    match_id: number
}

export interface NewMatchFromAdmin {
    match_name: string,
    match_date_time: Date,
    home_team_name: string,
    away_team_name: string
}

export interface NewGameHistoryForm {
    id: number
    home_team_score: number,
    away_team_score: number,
    home_team_name: string,
    away_team_name: string

}

export interface NewMatchInfoResult {
    home: {
        teamName: string,
        odd: number,
        teamId: number
    },
    away: {
        teamName: string,
        odd: number,
        teamId: number
    },
    matchId: number,
    date: Date
}
export interface Product{
    product_id:number;
    package:string;
    token:number;
    price:number;
}

export interface Transaction{
    product_id: number;
    member_id:number;
    price_paid:number;
    token_received:number;
    stripe_received_id:string;
}