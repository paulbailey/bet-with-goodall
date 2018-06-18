import 'whatwg-fetch'
import Promise from 'promise-polyfill'

function getLeagueTablesFetch (apiKey) {
  return fetch('http://api.football-data.org/v1/competitions/467/leagueTable', {
    headers: {
      'X-Auth-Token': apiKey
    }
  })
}

export default (apiKey) => {
  let results = {}
  let preReqs = [
    getLeagueTablesFetch(apiKey).then(r => r.json()),
    fetch('bets.json').then(r => r.json())
  ]
  Promise.all(preReqs).then(r => {
    let [tables, bets] = r
    console.log(tables, bets)
    results.title = tables.leagueCaption
    results.matchday = tables.matchday
    results.standings = tables.standings
    return results
  })
}
