import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BetCategory extends Component {
  checkGroupBet (bet) {
    return Object.keys(bet).includes('A')
  }

  render () {
    if (this.props.bets.filter(this.checkGroupBet).length > 0) {
      const bets = this.props.bets.map(el => {
        return (
          <tr>
            <td className={el.A.className}>{el.A.name}</td>
            <td className={el.B.className}>{el.B.name}</td>
            <td className={el.C.className}>{el.C.name}</td>
            <td className={el.D.className}>{el.D.name}</td>
            <td className={el.E.className}>{el.E.name}</td>
            <td className={el.F.className}>{el.F.name}</td>
            <td className={el.G.className}>{el.G.name}</td>
            <td className={el.H.className}>{el.H.name}</td>
            <td
              className={el.winning ? 'table-success' : 'table-danger'}
            ><strong>{el.winning ? el.winnings : '0.00' }</strong> <small>({el.winning ? '' : el.winnings})</small></td>
          </tr>
        )
      })
      return (<div>
        <h4><a name={this.props.slug}>{this.props.categoryName}</a></h4>
        <table className='table table-sm'>
          <thead>
            <tr>
              <th>Group A</th>
              <th>Group B</th>
              <th>Group C</th>
              <th>Group D</th>
              <th>Group E</th>
              <th>Group F</th>
              <th>Group G</th>
              <th>Group H</th>
              <th>Winnings</th>
            </tr>
          </thead>
          <tbody>
            {bets}
          </tbody>
        </table>
      </div>)
    } else {
      return (<div>
        <h4>{this.props.categoryName}</h4>
        <div>Coming soon...</div>
      </div>
      )
    }
  }
}

BetCategory.propTypes = {
  bets: PropTypes.array,
  slug: PropTypes.string,
  categoryName: PropTypes.string
}

export default BetCategory
