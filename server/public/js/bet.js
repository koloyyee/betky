let bet_history;

async function fetchBetHistory() {
    const res = await fetch('/admin/bet/')
    bet_history = await res.json();
    populateBet(bet_history)
}



document.querySelector('#list-bet-history').addEventListener('click', (event) => {
    fetchBetHistory();
})


function populateBet(bet_history){
    $('#betResult').modal('show');
    const result = document.querySelector('#betTable')
    let allBets = "";
    allBets +=`
    <div class="table-responsive">
    <table class="table">
    <tr>
    <th style="text-align: center; vertical-align: middle; "scope="col"> Member Id</th>
    <th style="text-align: center; vertical-align: middle; "scope="col"> Member Name</th>
    <th style="text-align: center; vertical-align: middle; "scope="col"> Bet Token</th>
    <th style="text-align: center; vertical-align: middle; "scope="col"> Bet Odd</th>
    <th style="text-align: center; vertical-align: middle; "scope="col"> Payout</th>
    </tr>
    </thead>
    <tbody>
    `
    for(let item of bet_history){
        allBets +=`
        <tr>
        <td style="text-align: center; ">${item.member_id}</td>
        <td  style="text-align: center; ">${item.name}</td>
        <td  style="text-align: center; ">${item.token}</td>
        <td  style="text-align: center; ">${item.odd}</td>
        <td  style="text-align: center; ">${item.payout}</td>
        </tr>
        `
    }
    allBets +=`
    </tbody>
    </table>
    </div>
    `
    result.innerHTML = "";
    result.innerHTML += allBets

}
