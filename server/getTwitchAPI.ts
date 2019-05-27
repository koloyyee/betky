import fetch from 'node-fetch'

async function twitch(){
    const res = await fetch('https://api.twitch.tv/helix/games?name=Counter-Strike: Global Offensive'
    , {
        method: "GET",
        headers:{
            "Client-ID" :"qvdwgpy2xxkheo32z744u327kadu72"
        }
    })

    const report = await res.json()
    const a =console
    a.log(report)
    

}

twitch()