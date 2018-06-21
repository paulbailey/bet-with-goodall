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
      return (
        <BetCategory
          key={slug(el)}
          slug={slug(el)}
          categoryName={el}
          bets={this.props.bets[el]}
        />
      )
    })

    const cats = categoryNames.map((el) => {
      return (
        <li key={slug(el)} className='nav-item'>
          <a className='nav-link' href={`#${slug(el)}`}>{el}</a></li>
      )
    })

    return (
      <div>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <a className='navbar-brand' href='#home'>Bet With Goodall</a>
          <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon' />
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav mr-auto'>
              {cats}
            </ul>
          </div>
          <div className='mr-sm-2'>As at end of {this.props.lastMatch}</div>
        </nav>
        {categories}
      </div>
    )
  }
}

CategoryList.propTypes = {
  bets: PropTypes.object,
  lastMatch: PropTypes.string
}

export default CategoryList
