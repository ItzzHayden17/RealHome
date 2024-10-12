import React from 'react'
import numeral from 'numeral';


const PropertyCard = (props) => {
  
  return (
    
    <div>
        <div class="property-card">
          <img src={props.img} alt="Property Image" />
          <div class="property-info">
            <h3>R{numeral(props.price).format('0,0').replace(/,/g, ' ')}</h3>

            <h4>{props.title}</h4>
            <p>{props.description}</p>
            <div class="property-details">
              <span><i class="fas fa-bed"></i>{props.bed}</span>
              <span><i class="fas fa-bath"></i>{props.bath}</span>
              <span><i class="fas fa-car"></i>{props.car}</span>
              <span><i class="fas fa-paw"></i>{props.pet ? <>Pet-Friendly</>:<>No pets allowed</>}</span>
              <span><i class="fas fa-home"></i>{props.sqrmeter} m2</span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default PropertyCard