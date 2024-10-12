import React from 'react'

const SearchAndFilter = () => {
  return (
    <div className='SearchAndFilter'>
        <section class="search-filter">
      <div class="search-container">
        <input
          type="text"
          placeholder="Search by location"
          id="search-location"
        />
        <select id="property-type">
          <option value="">Property Type</option>
          <option value="House">House</option>
          <option value="Apartment">Apartment</option>
          <option value="Townhouse">Townhouse</option>
        </select>
        <select id="price-range">
          <option value="">Price Range</option>
          <option value="0-100000">R0 - R100 000</option>
          <option value="10000-150000">R100 000 - R150 000</option>
          <option value="150000-200000">R150 000 - R200 000</option>
          <option value="200000-250000">R200 000 - R250 000</option>
          <option value="250000-300000">R250 000 - R300 000</option>
          <option value="300000-350000">R300 000 - R350 000</option>
          <option value="350000-400000">R350 000 - R400 000</option>
          <option value="400000-450000">R400 000 - R450 000</option>
          <option value="450000-500000">R450 000 - R500 000</option>
          <option value="500000-550000">R500 000 - R550 000</option>
          <option value="550000-600000">R550 000 - R600 000</option>
          <option value="600000-650000">R600 000 - R650 000</option>
          <option value="650000-700000">R650 000 - R700 000</option>
          <option value="700000-750000">R700 000 - R750 000</option>
          <option value="750000-800000">R750 000 - R800 000</option>
          <option value="800000-850000">R800 000 - R850 000</option>
          <option value="850000-900000">R850 000 - R900 000</option>
          <option value="900000-950000">R900 000 - R950 000</option>
          <option value="950000-1000000">R950 000 - R1 000 000</option>
          <option value="1000000-1250000">R1 000 000 - R1 250 000</option>
          <option value="1250000-1500000">R1 250 000 - R1 500 000</option>
          <option value="1500000-1750000">R1 500 000 - R1 750 000</option>
          <option value="1750000-2000000">R1 750 000 - R2 000 000</option>
          <option value="2000000-2250000">R2 000 000 - R2 250 000</option>
          <option value="2250000-2500000">R2 250 000 - R2 500 000</option>
          <option value="2500000-2750000">R2 500 000 - R2 750 000</option>
          <option value="2750000-3000000">R2 750 000 - R3 000 000</option>
          <option value="3000000-4000000">R3 000 000 - R4 000 000</option>
          <option value="4000000-5000000">R4 000 000 - R5 000 000</option>
        </select>
        <button onclick="searchProperties()">Search</button>
      </div>
    </section>
    </div>
  )
}

export default SearchAndFilter