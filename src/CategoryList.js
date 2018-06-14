import React, { Component } from 'react'
import slugify from 'slugify'

import BetCategory from './BetCategory'

function slug(string) {
  return slugify(string, {lower:true})
}

class CategoryList extends Component {

  render() {
  const categories = this.props.betCategories.map(el => {
    return (
      <BetCategory 
        key={slug(el)}
        categoryName={el}
        bets={this.props.bets}
      />
    )
  })

    const cats = this.props.betCategories.map((el) => {
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

export default CategoryList