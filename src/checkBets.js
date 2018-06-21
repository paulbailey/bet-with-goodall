import 'whatwg-fetch'

function getLeagueTablesFetch (apiKey) {
  return fetch('https://api.football-data.org/v1/competitions/467/leagueTable', {
    headers: {
      'X-Auth-Token': apiKey,
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
}

function getLastComnpletedFixture (apiKey) {
  return fetch('https://api.football-data.org/v1/competitions/467/fixtures', {
    headers: {
      'X-Auth-Token': apiKey,
      "Accept": "application/json",
      "Content-Type": "application/json"
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
  const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  groups.forEach(k => {
    const name = bet[k]
    bet[k] = {
      name,
      className: losers.has(name) ? 'table-success' : 'table-danger'
    }
  })
  bet.winning = isSuperset(losers, loserBetSet)
  return bet
}

export default (app, apiKey) => {
  let results = {}
  let preReqs = [
    getLeagueTablesFetch(apiKey).then(r => r.json()),
    fetch('bets.json').then(r => r.json()),
    getLastComnpletedFixture(apiKey).then(r => r.json())
  ]
  Promise.all(preReqs).then(r => {
    let [tables, bets, fixtures] = r
    let finishedFixtures = fixtures.fixtures.filter(el => {
      return el.status === 'FINISHED'
    })
    finishedFixtures.sort((a, b) => {
      return a.date < b.date ? 1 : -1
    })
    const lastFixture = finishedFixtures[0]
    console.log(tables, bets, finishedFixtures)
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
    results.lastMatch = `${lastFixture.homeTeamName} vs. ${lastFixture.awayTeamName}`
    app.setState(results)
    console.log(results)
  })
}
