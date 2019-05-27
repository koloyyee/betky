let matches;
let currentBet;

async function fetchMatch() {
  const res = await fetch("/admin/match");
  matches = await res.json();
  populateMatch(matches);
}
async function populateCurrentBetForm(matchId){
  const res = await fetch(`/current/matchById/${matchId}`)
  currentBet = await res.json();
  const result = document.querySelector('#currentBetTable')
  let allBet = "";
  allBet +=`
  <div class="table-responsive">
  <table class="table">
  <tr>
  <th style="text-align: center; vertical-align: middle; "scope="col">Home Bet</th>
  <th style="text-align: center; vertical-align: middle; "scope="col">Away Bet</th>
  </tr>
  </thead>
  <tbody>
  <td style="text-align: center; ">${currentBet.homeBet}</td>
  <td style="text-align: center; ">${currentBet.awayBet}</td>
  </tbody>
  </table>
  </div>
  `
  result.innerHTML = "";
  result.innerHTML += allBet

}

function populateMatch(matches) {
  const result = document.querySelector("#matchInfo");
  let allMatch = "";
  allMatch += `
  <div class="table-responsive">
  <table class="table">
  <tr>
  <th style="text-align: center; vertical-align: middle; "scope="col">Id</th>
  <th style="text-align: center; vertical-align: middle; "scope="col">Date Time</th>
  <th style="text-align: center; vertical-align: middle; "scope="col">Name</th>
  <th style="text-align: center; vertical-align: middle; "scope="col">Team Name(Home VS Away)</th>
  <th style="text-align: center; vertical-align: middle; "scope="col">Current Score</th>
  <th style="text-align: center; vertical-align: middle; "scope="col">Current Rate</th>
  <th style="text-align: center; vertical-align: middle; "scope="col">Channel Id</th>
  <th style="text-align: center; vertical-align: middle; "scope="col">ACTION</th>
  </tr>
  </thead>
  <tbody>
  `
  for (let match of matches) {
    allMatch += `
    <tr>
    <td style="text-align: center; ">${match.id}</td>
    <td style="text-align: center; ">${moment.utc(match.match_date_time,"YYYY-MM-DDTHH:mm:ss.SSSSZ").format("YYYY-MM-DD HH:mm")}</td>
    <td style="text-align: center; ">${match.match_name}</td>
    <td style="text-align: center; ">${match.home_team_name}  VS  ${match.away_team_name}</td>
    <td style="text-align: center; ">${match.current_home_score} : ${match.current_away_score}</td>
    <td style="text-align: center; ">${match.home_team_rate} / ${match.away_team_rate}</td>
    <td style="text-align: center; ">${match.channel_id}</td>
    <td style="text-align: center; "> 
    <button type="button" class="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#updateMatch" onClick="populateUpdateMatchForm(${match.id})"> Update</button>
    <button type="button" class="btn btn-outline-secondary btn-sm" data-toggle="modal" data-target="#currentBetModal" onClick="populateCurrentBetForm(${match.id})"> Current Bet</button>
    <button type="button" class="btn btn-outline-success btn-sm" data-toggle="modal" data-target="#conFirmResult" onClick="createMatchResultForm(${match.id})"> Finish</button>
    </td>
    </tr>
    `}
    
    allMatch +=`
    </tbody>
    </table>
    </div>
    `
    result.innerHTML = "";
    result.innerHTML += allMatch

  }

  function populateUpdateMatchForm(matchId) {
    $('#updateMatch').modal('show');
    const match = matches.find(match => match.id === matchId);
    const cleanMatch = {
      ...match,
      match_date_time: moment
        .utc(match.match_date_time, "YYYY-MM-DDTHH:mm:ss.SSSSZ")
        .format("YYYY-MM-DDTHH:mm")
    };
    
    const matchForm = document.querySelector("#update-match-form");
    for (let key of Object.keys(cleanMatch)) {
      matchForm.querySelector(`[name=${key}]`).value = cleanMatch[key];
    }
  }

  function createMatchResultForm(matchId) {
    $('#confirmResult').modal('show');
    const match = matches.find(match => match.id === matchId);
    const cleanResult = {
      id: match.id,
      home_team_name: match.home_team_name,
      home_team_score: match.current_home_score,
      away_team_name: match.away_team_name,
      away_team_score: match.current_away_score
    };
    const resultForm = document.querySelector("#create-result-form");
    for (let key of Object.keys(cleanResult)) {
      resultForm.querySelector(`[name=${key}]`).value = cleanResult[key];
    }
  }

  async function createMatch(newMatch) {
    const res = await fetch("/admin/match", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newMatch)
    });
    await res.json();
    fetchMatch();
    $('#newMatchModal').modal('hide');
    $('#allMatches').modal('show');

  }

  async function updateMatch(match) {
    const res = await fetch(`/admin/match/${match.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(match)
    });
    await res.json();
    await fetchMatch();
    window.location = "/";
  }

  async function createResult(match) {
    const res = await fetch(`/admin/result`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(match)
    });
    await res.json();
    await fetchMatch();
    window.location = "/";
  }

  document
    .querySelector("#create-result-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      const form = this;
      let formData = {};
      for (let input of form) {
        if (!["submit", "reset"].includes(input.type)) {
          formData[input.name] = input.value;
        }
      }
      formData = {
        ...formData,
        is_finished: true
      };
      await createResult(formData);
    });

  document
    .querySelector("#create-match-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      const form = this;
      const formData = {};

      for (let input of form) {
        if (!["submit", "reset"].includes(input.type)) {
          formData[input.name] = input.value;
        }
      }
      await createMatch(formData);
    });

  document
    .querySelector("#update-match-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      const form = this;
      const formData = {};

      for (let input of form) {
        if (!["submit", "reset"].includes(input.type)) {
          formData[input.name] = input.value;
        }
      }
      await updateMatch(formData);
    });
    
  document.querySelector("#list-match").addEventListener("click", event => {
    fetchMatch();
  });
