import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { format } from 'd3-format'

class BetCategory extends Component {
  checkGroupBet (bet) {
    return Object.keys(bet).includes('A')
  }

  render () {
    if (this.props.bets.filter(this.checkGroupBet).length > 0) {
      const pct = format('.1%')
      const bets = this.props.bets.map((el, idx) => {
        if (el.alive) {
          return (
            <tr key={idx}>
              <td className={el.A.className}>{el.A.name} <small>{pct(el.A.odds)}</small></td>
              <td className={el.B.className}>{el.B.name} <small>{pct(el.B.odds)}</small></td>
              <td className={el.C.className}>{el.C.name} <small>{pct(el.C.odds)}</small></td>
              <td className={el.D.className}>{el.D.name} <small>{pct(el.D.odds)}</small></td>
              <td className={el.E.className}>{el.E.name} <small>{pct(el.E.odds)}</small></td>
              <td className={el.F.className}>{el.F.name} <small>{pct(el.F.odds)}</small></td>
              <td className={el.G.className}>{el.G.name} <small>{pct(el.G.odds)}</small></td>
              <td className={el.H.className}>{el.H.name} <small>{pct(el.H.odds)}</small></td>
              <td
                className={el.winning ? 'table-success' : 'table-danger'}
              ><strong>{el.winning ? el.winnings : '0.00' }</strong> <small>({el.winning ? '' : el.winnings})</small></td>
            </tr>
          )
        } else {
          return (
            <tr key={idx}style={{opacity: 0.5}}>
              <td className={el.A.className}><s>{el.A.name} <small>{pct(el.A.odds)}</small></s></td>
              <td className={el.B.className}><s>{el.B.name} <small>{pct(el.B.odds)}</small></s></td>
              <td className={el.C.className}><s>{el.C.name} <small>{pct(el.C.odds)}</small></s></td>
              <td className={el.D.className}><s>{el.D.name} <small>{pct(el.D.odds)}</small></s></td>
              <td className={el.E.className}><s>{el.E.name} <small>{pct(el.E.odds)}</small></s></td>
              <td className={el.F.className}><s>{el.F.name} <small>{pct(el.F.odds)}</small></s></td>
              <td className={el.G.className}><s>{el.G.name} <small>{pct(el.G.odds)}</small></s></td>
              <td className={el.H.className}><s>{el.H.name} <small>{pct(el.H.odds)}</small></s></td>
              <td
                className={el.winning ? 'table-success' : 'table-danger'}
              ><s><strong>{el.winning ? el.winnings : '0.00' }</strong> <small>({el.winning ? '' : el.winnings})</small></s></td>
            </tr>
          )
        }
      })
      return (<div>
        <h4><a name={this.props.slug}>{this.props.categoryName}</a></h4>
        <div className='table-responsive'><table className='table table-sm table-bordered'>
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
        </div>
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
