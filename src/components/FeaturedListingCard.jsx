import React from 'react'
import numeral from 'numeral'
const FeaturedListingCard = (props) => {
  return (
    <div>
        <div class="listing-card">
          <a href={"/listing/"+props.id}>
          <img src={props.img} alt="Property Image" />
          <h3>{props.title}</h3>
          <p class="price">ZAR R{numeral(props.price).format("0,0").replace(/,/g, " ")}{" "}</p>
          <p class="location">{props.location}</p>
          <p class="reference"><span>Reference:</span> {props.reference}</p>
          </a>
        </div>
    </div>
  )
}

export default FeaturedListingCard