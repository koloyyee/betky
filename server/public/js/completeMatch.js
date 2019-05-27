let complete_match;

async function fetchCompletedMatch(){
    const res = await fetch('/admin/match/completed');
    complete_match = await res.json();
    populateCompletedMatch(complete_match)
}

function populateCompletedMatch(matches) {
    $('#betResult').modal('show');
    const matchResult = document.querySelector('#completeMatch');
    let allCompletedMatch = "";
    allCompletedMatch += `
            <div class="table-responsive">
            <table class="table">
            <tr>
            <th style="text-align: center; vertical-align: middle; "scope="col"> Match Name</th>
            <th style="text-align: center; vertical-align: middle; "scope="col"> Date Time</th>
            <th style="text-align: center; vertical-align: middle; "scope="col">Match Name</th>
            <th style="text-align: center; vertical-align: middle; "scope="col"> Team Name(Home VS Away)</th>
            <th style="text-align: center; vertical-align: middle; "scope="col"> Final Score</th>
            </tr>
            </thead>
            <tbody>
            `
    for (let match of matches) {
    allCompletedMatch += `
    <tr>
    <td style="text-align: center; ">${match.match_name}</td>
    <td style="text-align: center; ">${moment.utc(match.match_date_time,"YYYY-MM-DDTHH:mm:ss.SSSSZ").format("YYYY-MM-DD HH:mm")}</td>
    <td style="text-align: center; ">${match.match_name}</td>
    <td style="text-align: center; ">${match.home_team_name}  VS  ${match.away_team_name}</td>
    <td style="text-align: center; ">${match.current_home_score} : ${match.current_away_score}</td>
    `}

    allCompletedMatch +=`
    </tbody>
    </table>
    </div>
    `
    matchResult.innerHTML = "";
    matchResult.innerHTML += allCompletedMatch
}


document.querySelector('#list-completed-match').addEventListener('click',(event)=>{
    fetchCompletedMatch();
})

