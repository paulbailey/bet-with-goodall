import React, { Component } from 'react'
import PropTypes from 'prop-types'
import slugify from 'slugify'

import BetCategory from './BetCategory'

function slug (string) {
  return slugify(string, {lower: true})
}

class CategoryList extends Component {
  getBetCategories () {
    return Object.keys(this.props.bets)
  }
  render () {
    const categoryNames = this.getBetCategories()
    const categories = categoryNames.map(el => {
      console.log(this.props.bets[el])
      if (!this.props.bets[el][0].hasOwnProperty('detail')) {
        return (
          <BetCategory
            key={slug(el)}
            categoryName={el}
            bets={this.props.bets[el]}
          />
        )
      } else {
        return <div>Placeholder</div>
      }
    })

    const cats = categoryNames.map((el) => {
      return (
        <li key={slug(el)} className='nav-item'>
          <a className='nav-link' href={`#${slug(el)}`}>{el}</a></li>
      )
    })

    return (
      <div>
        <ul className='nav'>
          {cats}
        </ul>
        {categories}
      </div>
    )
  }
}

CategoryList.propTypes = {
  bets: PropTypes.object
}

export default CategoryList
