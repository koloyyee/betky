import puppeteer = require('puppeteer');
import * as Knex from 'knex';
import { setInterval } from 'timers';
import knexConfig = require('./knexfile');
import { CleanResultModel } from './Model/models';

const scrapResult = (async () => {

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    const url = 'https://gg17.bet/en/betting/results?tournamentIds[]=gin%3Abe7844da-fcda-45f7-8348-19924b24fc41'
    await page.goto(url);
    await page.waitFor(4000);

    const matchResult = await page.evaluate(() => Array.from(document
        .querySelectorAll('.sportEventRow__is-result___3P8Hb'))
        .map((item: any) => {
            const fields = item.innerText
                .replace(/\n+/g, "__")
                .replace(/WINNER/g, "")
                .replace(/\s+/g, " ")
                .replace(/\s/g, "")
                .replace(/__+/g, "__")
                .trim()
                .split("__")
            return fields;
        }));
    console.log(matchResult)
    await browser.close();
    return matchResult;
});

const transferResult = (async (results: string[]) => {
    const cleanMatchResult = [] as any;
    const match_name = results[0][0];
    results.map((item: any) => {
        const checking = item[0].match(new RegExp('[0-9]{2}:[0-9]{2}'))
        let singleMatch = {
            match_name: checking ? match_name : item[0],
            home_team_name: checking ? item[2] : item[3],
            home_team_won: checking ? (item[3] == 'Win') : (item[4] == 'Win'),
            away_team_name: item[(item.length - 1)]
        }
        cleanMatchResult.push(singleMatch);

    });
    return cleanMatchResult;
});

const enterResult = (async (clearResult: CleanResultModel[]) => {
    const knex = Knex(knexConfig[process.env.NODE_ENV || "development"])
    await knex.transaction(async (t: Knex.Transaction) => {
        for (let item of clearResult) {
            const homeid = (await t.select('id').from('team').where(t.raw('LOWER("team_name") = ?', item.home_team_name.toLowerCase())).limit(1))[0];
            const awayid = (await t.select('id').from('team').where(t.raw('LOWER("team_name") = ?', item.away_team_name.toLowerCase())).limit(1))[0];
            const checkMatch = (await t.select('id').from('match').where('home_team_id', homeid.id).andWhere('away_team_id', awayid.id).limit(1))[0];
            const gameHistoryExisted = (await t.select('id').from('game_history').where('match_id', checkMatch.id).limit(1))[0];
            if (gameHistoryExisted == undefined) {
                let matchWithIds = {
                    match_id: checkMatch.id,
                    home_team_won: item.home_team_won
                }
                const newResultId = (await t.insert(matchWithIds).into('game_history').returning('id'))[0];
                const resultWithOdds = (await t.raw(`SELECT 
                                                        game_history.id AS game_history_id,
                                                        match.id AS match_id,
                                                        bet.id AS bet_id,
                                                        bet.odd AS bet_odd,
                                                        bet.token AS token,
                                                        bet.member_id AS member_id,
                                                        CASE WHEN match.home_team_id = bet.team_id
                                                        THEN game_history.home_team_won
                                                        ELSE (NOT game_history.home_team_won)
                                                        END AS bet_won
                                                        FROM game_history
                                                        INNER JOIN match ON game_history.match_id = match.id
                                                        INNER JOIN bet ON match.id = bet.match_id AND
                                                        (match.home_team_id = bet.team_id OR match.away_team_id = bet.team_id)
                                                        WHERE game_history.id = ${newResultId}`)).rows;
                for (let item of resultWithOdds) {
                    if (item.bet_won == true) {
                        let bet_history = {
                            game_history_id: item.game_history_id,
                            bet_id: item.bet_id,
                            payout: item.bet_odd * item.token
                        }
                        await t.insert(bet_history).into('total_bet_history')
                        await t.table('member').where('id', item.member_id).increment('token', bet_history.payout);
                        await t.table('dealer').decrement('token', bet_history.payout);
                    }
                    if (item.bet_won == false) {
                        let bet_history = {
                            game_history_id: item.game_history_id,
                            bet_id: item.bet_id,
                            payout: item.bet_odd * item.token
                        }
                        await t.insert(bet_history).into('total_bet_history')
                    }
                }
            }
        }
    })
    return Promise.resolve();
});

setInterval(async () => {
    const scrap = await scrapResult();
    const result = await transferResult(scrap);
    await enterResult(result);
}, 10000)
// const fake = [['lol cup 1', '00', 'today', 'GG Team', 'Win', 'Loss', 'HAHA Team']]