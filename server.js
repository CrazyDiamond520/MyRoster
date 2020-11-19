const express = require('express')
const path = require('path')
const app = express()
const urllib = require('urllib')

const port = 3000
app.listen(port, function(){
    console.log("server is up and running !")
})

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))




const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

app.get('/teams/:teamName', function(req, res){
    const {teamName} = req.params
    const teamId = teamToIDs[teamName]
    urllib.request('http://data.nba.net/10s/prod/v1/2018/players.json', function(err, data){
    const league = JSON.parse(data.toString())
    const nba = league.league.standard
    const teamData = nba.filter(p => p.teamId == teamId && p.isActive)
    const teamRelevantData = teamData.map((p) => {return{
        firstName: p.firstName,
        lastName: p.lastName,
        jersey: p.jersey,
        pos: p.pos
    }})
    res.send(teamRelevantData)
})
})