import puppeteer = require('puppeteer');
import * as Knex from 'knex';
import * as moment from 'moment';
import knexConfig = require('./knexfile');
import { CleanOddModel, TeamId_Name_Model, MatchWithHomeIdModel, MatchWithTeamIdModel, MatchWIthAllIdModel } from './Model/models';

const scrapOdd = (async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    const url = 'https://gg17.bet/en/betting/?tournamentIds[]=gin%3Abe7844da-fcda-45f7-8348-19924b24fc41'
    await page.goto(url);
    await page.waitFor(9000);

    const matchInfos = await page.evaluate(() => Array.from(document
        .querySelectorAll('div[class^=sportEventRow__container]'))
        .map((item: any) => {
            const fields = item.innerText
                .replace(/\n+/g, "__")
                .replace(/WINNER/g, "")
                .replace(/__+/g, "__")
                .split("__")

            return fields;
        }));
    // const match_length = matchInfos.map((item:any)=>item.length)
    // console.log(match_length)
    console.log(matchInfos)
    await page.close();
    await browser.close();
    return matchInfos;
});

const transferOdd = (async (odds: string[]) => {
    const cleanMatchInfos: CleanOddModel[] = [];
    let matchName = ''
    for (let i = 0; i < odds.length; i++) {
        const haveMatchName = !(odds[i][0].match(new RegExp('[0-9]{2}:[0-9]{2}')))
        if (haveMatchName) {
            matchName = odds[i][0];
            let singleMatch = {
                match_name: matchName,
                match_date_time: (odds[i][2] == 'TODAY') ? moment.utc(odds[i][1], "hh:mm").toDate() : moment.utc(odds[i][2] + ` ` + odds[i][1], "MMM DD hh:mm").toDate(),
                home_team_name: odds[i][3],
                away_team_name: odds[i][6],
                home_team_rate: parseFloat(odds[i][4]),
                away_team_rate: parseFloat(odds[i][5])
            }
            cleanMatchInfos.push(singleMatch);
        } else {
            const checkingFistItemIsTime = ((odds[i][0].match(new RegExp('[0-9]{2}:[0-9]{2}'))));
            const checkingSecItemIsDate = ((odds[i][1].match(new RegExp('[A-Z]{3} [0-9]{2}'))));
            let singleMatch = {
                match_name: matchName,
                match_date_time: (checkingFistItemIsTime && checkingSecItemIsDate) ? moment.utc(odds[i][1] + ` ` + odds[i][0], "MMM DD hh:mm").toDate() : moment.utc(odds[i][0], "hh:mm").toDate(),
                home_team_name: odds[i][2],
                away_team_name: odds[i][5],
                home_team_rate: parseInt(odds[i][3]),
                away_team_rate: parseInt(odds[i][4])
            }
            cleanMatchInfos.push(singleMatch);
        }
        console.log(cleanMatchInfos);
    }
    return cleanMatchInfos;
})


const enterOdd = (async (cleanOdds: CleanOddModel[]) => {
    const teams: string[] = [];
    cleanOdds.map((item: CleanOddModel) => {
        teams.push(item.home_team_name);
        teams.push(item.away_team_name);
    });
    const teamsUnique = Array.from<string>(new Set(teams))
    // console.log(teamsUnique);
    const knex = Knex(knexConfig[process.env.NODE_ENV || "development"])
    await knex.transaction(async (t: Knex.Transaction) => {
        const teamNameWithId: TeamId_Name_Model[] = [];
        for (let item of teamsUnique) {
            const checking = await t.select('id').from('team')
                                    .where(t.raw('LOWER("team_name") = ?', item.toLowerCase())).limit(1);
            if (checking.length > 0) {
                let teamWithId = {
                    team_name: item,
                    team_id: checking[0].id
                }
                teamNameWithId.push(teamWithId);
            } else {
                let teamWithId = {
                    team_name: item,
                    team_id: (await t.insert({ team_name: item }).into('team').returning('id'))[0]
                }
                teamNameWithId.push(teamWithId);
            }
        }
        // console.log(teamNameWithId);
        const MatchWithHomeId: MatchWithHomeIdModel[] = [];
        for (let item of cleanOdds) {
            for (let team of teamNameWithId) {
                if ((team.team_name).toLowerCase() == (item.home_team_name).toLowerCase()) {
                    let matchInfoWithHomeTeamID = {
                        ...item,
                        home_team_id: team.team_id
                    }
                    MatchWithHomeId.push(matchInfoWithHomeTeamID);
                }
            }
        }
        const MatchWithAllTeamId: MatchWithTeamIdModel[] = [];
        for (let item of MatchWithHomeId) {
            for (let team of teamNameWithId) {
                if ((team.team_name).toLowerCase() == (item.away_team_name).toLowerCase()) {
                    let matchInfoWithAwayTeamID = {
                        ...item,
                        away_team_id: team.team_id
                    }
                    MatchWithAllTeamId.push(matchInfoWithAwayTeamID);
                }
            }
        }
        const MatchWithAllId: MatchWIthAllIdModel[] = [];
        for (let item of MatchWithAllTeamId) {
            const checking = await t.select('id').from('match')
                                    .where('home_team_id', item.home_team_id)
                                    .where('away_team_id', item.away_team_id).limit(1)
            if (checking.length >= 1) {
                let match = {
                    ...item,
                    match_id: checking[0].id
                }
                MatchWithAllId.push(match);
            } else {
                let match = {
                    ...item,
                    match_id: (await t.insert({
                        match_name: item.match_name,
                        match_date_time: item.match_date_time,
                        home_team_id: item.home_team_id,
                        away_team_id: item.away_team_id,
                    }).into('match').returning('id'))[0]
                }
                MatchWithAllId.push(match);
            }
        }
        // console.log(MatchWithAllId);
        for (let item of MatchWithAllId) {
            let homeOdd = {
                match_id: item.match_id,
                team_id: item.home_team_id,
                rate: item.home_team_rate
            }
            let awayOdd = {
                match_id: item.match_id,
                team_id: item.away_team_id,
                rate: item.away_team_rate
            }
            await t.batchInsert('odd', [homeOdd, awayOdd]);
        }
        return Promise.resolve()
    });
});



setInterval(async () => {
    const scrap = await scrapOdd();
    const clearOdds = await transferOdd(scrap);
    await enterOdd(clearOdds);
}, 10000)



/*const fakeMatches = [
    {
        match_date_time: new Date(),
        match_name: 'GSLSEASON2',
        home_team_name: 'Impact',
        home_team_rate: '1.48',
        away_team_rate: '2.46',
        away_team_name: 'Zest'
    },
    {
        match_date_time: new Date(),
        match_name: 'GSLSEASON2',
        home_team_name: 'Gumiho',
        home_team_rate: '1.48',
        away_team_rate: '2.46',
        away_team_name: 'Trust'
    },
    {
        match_date_time: new Date(),
        match_name: 'GSLSEASON2',
        home_team_name: 'Innovation',
        home_team_rate: '1.48',
        away_team_rate: '2.46',
        away_team_name: 'Patience'
    },
    {
        match_date_time: new Date(),
        match_name: 'GSLSEASON2',
        home_team_name: 'Maru',
        home_team_rate: '1.48',
        away_team_rate: '2.46',
        away_team_name: 'Armani'
    }
]
*/