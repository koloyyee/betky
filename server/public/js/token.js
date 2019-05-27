let token;

async function fetchToken(){
    const res = await fetch('/admin/token');
    token = await res.json();
    popToken(token)
}

function popToken(token){
    const result = document.querySelector('#dealer');
    result.innerHTML = "";
        result.innerHTML +=`
        <h1><span class="badge badge-success">
        Token: ${token}
        </span>
        </h1>
        `

}

fetchToken();