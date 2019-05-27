import * as Knex from "knex";
import { hashPassword } from '../hash';

exports.seed = async function (knex: Knex) {

    await knex.table('total_bet_history').del()
    await knex.table('bet').del()
    await knex.table('game_history').del()
    await knex.table('odd').del()
    await knex.table('match').del()
    await knex.table('team').del()
    await knex.table('member').del()
    await knex.table('dealer').del()
    await knex.table('channel').del()
    
    const channelIds = await knex.insert([{
        game:"CS:GO",
        channel:"esl_csgob"
    },
    {
        game:"Starcraft",
        channel:"esl_sc2"
    },
    {
        game:"Dota 2",
        channel:"esl_dota2"
    },
    {
        game:"L.O.L",
        channel:"esl_lol"
    },
    {
        game:"MSI:L.O.L",
        channel:"videos/418903323"
    }
]).into('channel').returning('id')

    const channelId1 = channelIds[0];
    const channelId2 = channelIds[1];
    const channelId3 = channelIds[2];
    const channelId4 = channelIds[3];
    const channelId5 = channelIds[4]

    await knex.insert({
        token: 100000
    }).into('dealer')

    // const members = 
    await knex.insert([
        {
            name: "david",
            password: await hashPassword("1234"),
            email: "abc@gmail.com",
            token: 10000
        },
        {
            name: "andy",
            password: await hashPassword("5678"),
            email: '112@gmail.com',
            token: 10000
        },
        {
            name: "mark",
            password: await hashPassword("9012"),
            email: "aa2@gmail.com",
            token: 10000
        }
    ]).into('member')
    // .returning('id');

    // const memberId1 = members[0];
    // const memberId2 = members[1];
    // const memberId3 = members[2];

    const teams = await knex.insert([
        {
            team_name: "Abc Team"
        },
        {
            team_name: "GG Team"
        },
        {
            team_name: "YY Team"
        },
        {
            team_name: "HAHA Team"
        },
        {
            team_name:"BMR"
        },
        {
            team_name:"PVB"
        },
        {
            team_name:"EER"
        },
        {
            team_name:"QQRS"
        },
        {
            team_name:"SUNSHINE"
        },
        {
            team_name:"MOON RISE"
        }

    ]).into('team').returning('id');

    const teamId1 = teams[0];
    const teamId2 = teams[1];
    const teamId3 = teams[2];
    const teamId4 = teams[3];
    const teamId5 = teams[4];
    const teamId6 = teams[5];
    const teamId7 = teams[6];
    const teamId8 = teams[7];
    const teamId9 = teams[8];
    const teamId10 = teams[9];





    const matches = await knex.insert([
        {
            match_name: "CS:GO",
            home_team_id: teamId1,
            away_team_id: teamId2,
            //Tuesday, April 30, 2019 8:00:00 PM
            //https://www.epochconverter.com/
            match_date_time: new Date('2019-04-30 20:00:00Z'),
            channel_id: channelId1,
            current_home_score: 0,
            current_away_score: 0,
            
        },
        {
            match_name: "Starcraft II",
            home_team_id: teamId3,
            away_team_id: teamId4,
            //Saturday, April 20, 2019 7:00:00 PM
            match_date_time: new Date('2019-4-27 19:00:00Z'),
            channel_id: channelId2,
            current_home_score: 0,
            current_away_score: 0
        },
        {
            match_name:"Dota 2",
            home_team_id:teamId5,
            away_team_id:teamId6,
            match_date_time: new Date('2019-5-01 19:00:00Z'),
            channel_id:channelId3,
            current_home_score: 0,
            current_away_score: 0
        },
        {
            match_name:"League of Legends Regular Season",
            home_team_id:teamId7,
            away_team_id:teamId8,
            match_date_time: new Date('2019-5-10 20:00:00Z'),
            channel_id:channelId4,
            current_home_score: 0,
            current_away_score: 0
        },
        {
            match_name:"MSI 2019: League of Legends",
            home_team_id:teamId9,
            away_team_id:teamId10,
            match_date_time: new Date('2019-5-10 18:00:00Z'),
            channel_id:channelId5,
            current_home_score: 0,
            current_away_score: 0
        }

    ]).into('match').returning('id');

    const matchId1 = matches[0];
    const matchId2 = matches[1];
    const matchId3 = matches[2];
    const matchId4 = matches[3];
    const matchId5 = matches[4];


    // const odds = 
    await knex.insert([
        {
            rate: 1.85,
            team_id: teamId1,
            match_id: matchId1
        },
        {
            rate: 1.6,
            team_id: teamId2,
            match_id: matchId1
        },
        {
            rate: 1.5,
            team_id: teamId3,
            match_id: matchId2
        },
        {
            rate: 1.9,
            team_id: teamId4,
            match_id: matchId2
        },
        {
            rate: 1.3,
            team_id: teamId5,
            match_id: matchId3
        },
        {
            rate: 2.8,
            team_id: teamId6,
            match_id: matchId3
        }
        ,
        {
            rate: 1.5,
            team_id: teamId7,
            match_id: matchId4
        },
        {
            rate: 2.3,
            team_id: teamId8,
            match_id: matchId4
        },
        {
            rate: 1.3,
            team_id: teamId9,
            match_id: matchId5
        },
        {
            rate: 2.9,
            team_id: teamId10,
            match_id: matchId5
        }
    ]).into('odd')
    // .returning(['id', 'rate', 'team_id', 'match_id']);

    // const bets = await knex.insert([
    //     {
    //         member_id: memberId1,
    //         team_id: teamId1,
    //         match_id: matchId1,
    //         token: 2000,
    //         odd: odds[0].rate
    //     },
    //     {
    //         member_id: memberId1,
    //         team_id: teamId1,
    //         match_id: matchId1,
    //         token: 1000,
    //         odd: odds[0].rate
    //     },
    //     {
    //         member_id: memberId2,
    //         team_id: teamId2,
    //         match_id: matchId2,
    //         token: 2000,
    //         odd: odds[1].rate
    //     },
    //     {
    //         member_id: memberId1,
    //         team_id: teamId4,
    //         match_id: matchId2,
    //         token: 2000,
    //         odd: odds[3].rate
    //     },
    //     {
    //         member_id: memberId2,
    //         team_id: teamId2,
    //         match_id: matchId3,
    //         token: 2000,
    //         odd: odds[1].rate
    //     },
    //     {
    //         member_id: memberId1,
    //         team_id: teamId4,
    //         match_id: matchId3,
    //         token: 2000,
    //         odd: odds[3].rate
    //     },
    //     {
    //         member_id: memberId2,
    //         team_id: teamId2,
    //         match_id: matchId4,
    //         token: 2000,
    //         odd: odds[1].rate
    //     },
    //     {
    //         member_id: memberId1,
    //         team_id: teamId4,
    //         match_id: matchId4,
    //         token: 2000,
    //         odd: odds[3].rate
    //     },
    //     {
    //         member_id: memberId2,
    //         team_id: teamId2,
    //         match_id: matchId5,
    //         token: 2000,
    //         odd: odds[1].rate
    //     },
    //     {
    //         member_id: memberId1,
    //         team_id: teamId4,
    //         match_id: matchId5  ,
    //         token: 2000,
    //         odd: odds[3].rate
    //     }
    // ]).into('bet').returning(['id','token', 'odd','member_id']);

    // await knex.table('member').where('id', bets[0].member_id).decrement('token',bets[0].token)
    // await knex.table('dealer').where('id',1).increment('token',bets[0].token)
    // await knex.table('member').where('id', bets[1].member_id).decrement('token',bets[1].token)
    // await knex.table('dealer').where('id',1).increment('token',bets[1].token)
    // await knex.table('member').where('id', bets[2].member_id).decrement('token',bets[2].token)
    // await knex.table('dealer').where('id',1).increment('token',bets[2].token)
    // await knex.table('member').where('id', bets[3].member_id).decrement('token',bets[3].token)
    // await knex.table('dealer').where('id',1).increment('token',bets[3].token)

    // const game_historys = await knex.insert([
    //     {
    //         home_team_won: true,
    //         match_id: matchId1,
    //         home_team_score: 2,
    //         away_team_score: 1
    //     },
    //     {
    //         home_team_won: false,
    //         match_id: matchId2,
    //         home_team_score: 1,
    //         away_team_score: 4
    //     }
    // ]).into('game_history').returning('id');

    // const game_history1 = game_historys[0];
    // const game_history2 = game_historys[1];

    // const historys = await knex.insert([
    //     {
    //         game_history_id: game_history1,
    //         bet_id: bets[0].id,
    //         payout: bets[0].token * bets[0].odd
    //     },
    //     {
    //         game_history_id: game_history1,
    //         bet_id: bets[1].id,
    //         payout: bets[1].token * bets[1].odd
    //     },
    //     {
    //         game_history_id: game_history2,
    //         bet_id: bets[2].id,
    //         payout: odds[2].rate * 0
    //     },
    //     {
    //         game_history_id: game_history2,
    //         bet_id: bets[3].id,
    //         payout: odds[3].rate * bets[3].token
    //     }
    // ]).into('total_bet_history').returning('payout')

//     await knex.table('member').where('id',bets[0].member_id).increment('token',historys[0])
//     await knex.table('dealer').where('id', 1).decrement('token',historys[0])
//     await knex.table('member').where('id',bets[1].member_id).increment('token',historys[1])
//     await knex.table('dealer').where('id', 1).decrement('token',historys[1])
//     await knex.table('member').where('id',bets[2].member_id).increment('token',historys[2])
//     await knex.table('dealer').where('id', 1).decrement('token',historys[2])
//     await knex.table('member').where('id',bets[3].member_id).increment('token',historys[3])
//     await knex.table('dealer').where('id', 1).decrement('token',historys[3])
};
