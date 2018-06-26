import 'whatwg-fetch'
import { csv } from 'd3-fetch'
import { max } from 'd3-array'
function getLeagueTablesFetch (apiKey) {
  return fetch('https://api.football-data.org/v1/competitions/467/leagueTable', {
    headers: {
      'X-Auth-Token': apiKey,
      'Accept': 'application/json'
    }
  })
}

function getForecastData () {
  return csv('https://projects.fivethirtyeight.com/soccer-api/international/2018/wc_forecasts.csv')
}

function getLastCompletedFixture (apiKey) {
  return fetch('https://api.football-data.org/v1/competitions/467/fixtures', {
    headers: {
      'X-Auth-Token': apiKey,
      'Accept': 'application/json'
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

function getLatestForecast (arr) {
  const latestDate = max(arr, r => r.forecast_timestamp)
  const latestForecast = arr.filter(r => {
    return r.forecast_timestamp === latestDate
  })
  let forecast = {}
  latestForecast.forEach(r => {
    const odds = {
      'win': +r.group_1,
      'qual': +r.group_1 + +r.group_2,
      'lose': +r.group_4
    }
    if (r.team === 'South Korea') {
      r.team = 'Korea Republic'
    }
    forecast[r.team] = odds
  })
  console.log(forecast)
  return forecast
}

function checkGroupBet (bet, rank, standings, forecast) {
  let oddsKey = ''
  if (rank.length === 2) {
    oddsKey = 'qual'
  } else if (rank[0] === 1) {
    oddsKey = 'win'
  } else if (rank[0] === 4) {
    oddsKey = 'lose'
  }
  const loserBetSet = new Set(Object.values(bet))
  const losers = getTeamsAtRank(standings, rank)
  const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  let betAlive = true
  groups.forEach(k => {
    const name = bet[k]
    const odds = forecast[name][oddsKey]
    if (odds === 0) {
      betAlive = false
    }
    bet[k] = {
      name,
      className: losers.has(name) ? 'table-success' : 'table-danger',
      odds: odds
    }
  })
  bet.winning = isSuperset(losers, loserBetSet)
  bet.alive = betAlive
  return bet
}

export default (app, apiKey) => {
  let results = {}
  let preReqs = [
    getLeagueTablesFetch(apiKey).then(r => r.json()),
    fetch('bets.json').then(r => r.json()),
    getLastCompletedFixture(apiKey).then(r => r.json()),
    getForecastData().then(getLatestForecast)
  ]
  Promise.all(preReqs).then(r => {
    app.setState({
      loading: false
    })
    let [tables, bets, fixtures, forecast] = r
    let finishedFixtures = fixtures.fixtures.filter(el => {
      return el.status === 'FINISHED'
    })
    finishedFixtures.sort((a, b) => {
      return a.date < b.date ? 1 : -1
    })
    const lastFixture = finishedFixtures[0]
    bets['Group Losers'] = bets['Group Losers'].map(b => {
      return checkGroupBet(b, [4], tables.standings, forecast)
    })
    bets['Group Winners'] = bets['Group Winners'].map(b => {
      return checkGroupBet(b, [1], tables.standings, forecast)
    })
    bets['Group Qualifiers'] = bets['Group Qualifiers'].map(b => {
      return checkGroupBet(b, [1, 2], tables.standings, forecast)
    })
    results.title = tables.leagueCaption
    results.matchday = tables.matchday
    results.standings = tables.standings
    results.bets = bets
    results.lastMatch = `${lastFixture.homeTeamName} vs. ${lastFixture.awayTeamName}`
    app.setState(results)
  }).catch(err => {
    console.error(err)
    app.setState({
      fetchError: err,
      loading: false
    })
  })
}
