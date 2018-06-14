import 'whatwg-fetch'
import React, { Component } from 'react'
import './App.css'
import CategoryList from './CategoryList'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      matchday: 0,
      betCategories: ['Group Winners', 'Group Losers', 'Group Qualifiers', 'Single Bets'],
      bets: []
    }
    fetch('http://api.football-data.org/v1/competitions/467/leagueTable', {
    	headers: {
      	'X-Auth-Token': '2730f4455d51414f8a6b86e274176d91'
      }
    }).then((r) => r.json()).then(json => {
      console.log(json)
      this.setState({
        title: json.leagueCaption,
        matchday: json.matchday,
        standings: json.standings
      })
    })
  }

  checkGroupRank (group, team, rank) {
    if (!rank.isArray()) {
      rank = [rank]
    }
    const groupName = group.upper()
    const matched = this.state.standings[groupName].filter((item) => {
      return rank.includes(item.rank)
    }).map(el => {
      return el.team
    })
    return matched.includes(team)
  }

  checkGroupWinner (group, team) {
    return this.checkGroupRank(group, team, 1)
  }

  checkGroupQualifier (group, team) {
    return this.checkGroupRank(group, team, [1, 2])
  }

  checkGroupLoser (group, team) {
    return this.checkGroupRank(group, team, 4)
  }
  
  render() {
    const propsbets = [
      {
        A: 'Hello',
        B: 'Dave',
        C: 'You\'re',
        D: 'my',
        E: 'wife',
        F: 'now',
        G: 'Hello',
        H: 'Dave'
      }
    ]
  
    return (
      <div className="container-fluid">
        <h1>Bet With Goodall</h1>
        <h2>{this.state.title}</h2>
        <h3>Matchday {this.state.matchday}</h3>
        <CategoryList
          betCategories={this.state.betCategories}
          bets={propsbets}
         />
      </div>
    )
  }
}

export default App;
