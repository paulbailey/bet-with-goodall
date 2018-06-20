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
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <a className='navbar-brand' href ='#'>Bet With Goodall</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
          {cats}
        </ul>
        {categories}
        </div>
        </nav>
    )
  }
}

CategoryList.propTypes = {
  bets: PropTypes.object
}

export default CategoryList
