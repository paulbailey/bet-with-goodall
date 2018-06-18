import React, { Component } from 'react'
import './App.css'
import CategoryList from './CategoryList'
import checkBets from './checkBets'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = checkBets('2730f4455d51414f8a6b86e274176d91')
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

  render () {
    return (
      <div className='container-fluid'>
        <h1>Bet With Goodall</h1>
        <h2>{this.state.title}</h2>
        <h3>Matchday {this.state.matchday}</h3>
        <CategoryList
          bets={this.state.bets}
        />
      </div>
    )
  }
}

export default App
