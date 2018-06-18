import 'whatwg-fetch'

function getLeagueTablesFetch (apiKey) {
  return fetch('http://api.football-data.org/v1/competitions/467/leagueTable', {
    headers: {
      'X-Auth-Token': apiKey
    }
  })
}

function isSuperset (set, subset) {
  for (var elem of subset) {
    if (!set.has(elem)) {
      return false
    }
  }
  return true
}

function getTeamsAtRank (standings, rank) {
  let rows = []
  Object.keys(standings).forEach(grp => {
    rows.push(...standings[grp])
  })
  const filteredRows = rows.filter(el => {
    return rank.includes(el.rank)
  })
  return new Set(filteredRows.map(el => {
    return el.team
  }))
}

function checkGroupBet (bet, rank, standings) {
  const loserBetSet = new Set(Object.values(bet))
  const losers = getTeamsAtRank(standings, rank)
  bet.winning = isSuperset(losers, loserBetSet)
  return bet
}

export default (app, apiKey) => {
  let results = {}
  let preReqs = [
    getLeagueTablesFetch(apiKey).then(r => r.json()),
    fetch('bets.json').then(r => r.json())
  ]
  Promise.all(preReqs).then(r => {
    let [tables, bets] = r
    console.log(tables, bets)
    bets['Group Losers'] = bets['Group Losers'].map(b => {
      return checkGroupBet(b, [4], tables.standings)
    })
    bets['Group Winners'] = bets['Group Winners'].map(b => {
      return checkGroupBet(b, [1], tables.standings)
    })
    bets['Group Qualifiers'] = bets['Group Qualifiers'].map(b => {
      return checkGroupBet(b, [1, 2], tables.standings)
    })

    results.title = tables.leagueCaption
    results.matchday = tables.matchday
    results.standings = tables.standings
    results.bets = bets
    app.setState(results)
    console.log(results)
  })
}
