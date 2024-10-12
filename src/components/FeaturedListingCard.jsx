import React from 'react'

const FeaturedListingCard = (props) => {
  return (
    <div>
        <div class="listing-card">
          <img src={props.img} alt="Property Image" />
          <h3>{props.title}</h3>
          <p class="price">ZAR {props.price}</p>
          <p class="location">{props.location}</p>
          <p class="reference">Reference: {props.reference}</p>
        </div>
    </div>
  )
}

export default FeaturedListingCard