import React from 'react'
import Navbar from '../components/Navbar'
const Rent = () => {
  return (
    <div className='Rent'>
      <Navbar/>
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
          <option value="0-10000">R0 - R10 000</option>
          <option value="10000-20000">R10 000 - R20 000</option>
          <option value="20000-50000">R20 000 - R50 000</option>
          <option value="50000-100000">R50 000 - R100 000</option>
        </select>
        <button onclick="searchProperties()">Search</button>
      </div>
    </section>

    <section class="properties-list">
      <h2>Properties to <span>Rent</span></h2>
      <div class="properties-grid">

        <div class="property-card">
          <img src="./media/homepage4.jpg" alt="Property Image" />
          <div class="property-info">
            <h3>R15 000 p/m</h3>
            <h4>3 Bedroom Townhouse To Rent In Vanderbijlpark SE 2</h4>
            <p>
              This spacious townhouse is situated in a secure complex, offering
              open plan living areas with a lovely wooden kitchen...
            </p>
            <div class="property-details">
              <span><i class="fas fa-bed"></i> 3</span>
              <span><i class="fas fa-bath"></i> 2</span>
              <span><i class="fas fa-car"></i> 2</span>
              <span><i class="fas fa-paw"></i> Pet-friendly</span>
              <span><i class="fas fa-home"></i> 1500 m2</span>
            </div>
          </div>
        </div>

        <div class="property-card">
          <img src="./media/homepage3.jpg" alt="Property Image" />
          <div class="property-info">
            <h3>R8 500 p/m</h3>
            <h4>2 Bedroom House To Rent In Moreleta Park</h4>
            <p>
              This modern house is in a secure estate and offers convenient
              living, perfect for young professionals...
            </p>
            <div class="property-details">
              <span><i class="fas fa-bed"></i> 2</span>
              <span><i class="fas fa-bath"></i> 1</span>
              <span><i class="fas fa-car"></i> 1</span>
              <span><i class="fas fa-paw"></i> Pet-friendly</span>
              <span><i class="fas fa-home"></i> 1500 m2</span>
            </div>
          </div>
        </div>

        <div class="property-card">
          <img src="./media/homepage1.jpg" alt="Property Image" />
          <div class="property-info">
            <h3>R45 000 p/m</h3>
            <h4>2 Bedroom Apartment To Rent In Camps Bay</h4>
            <p>
              This modern apartment is in a secure estate and offers convenient
              living, perfect for young professionals...
            </p>
            <div class="property-details">
              <span><i class="fas fa-bed"></i> 2</span>
              <span><i class="fas fa-bath"></i> 1</span>
              <span><i class="fas fa-car"></i> 1</span>
              <span><i class="fas fa-paw"></i> Pet-friendly</span>
              <span><i class="fas fa-home"></i> 1500 m2</span>
            </div>
          </div>
        </div>

      </div>
    </section>
    </div>
  )
}

export default Rent