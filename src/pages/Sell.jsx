import React from 'react'
import Navbar from '../components/Navbar'
const Sell = () => {
  return (
    
    <div className='Sell'>
      <Navbar/>
      <section class="sell-property">
      <h2>List Your <span>Property</span></h2>
      <form
        id="property-form"
        action="submit-property"
        method="POST"
        enctype="multipart/form-data"
      >

        <div class="form-section">
          <h3>Property Details</h3>
          <label for="listing-type">Listing Type:</label>
          <select id="listing-type" name="listing-type">
            <option value="sale">Sale</option>
            <option value="rental">Rental</option>
          </select>

          <label for="property-type">Property Type:</label>
          <select id="property-type" name="property-type">
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="townhouse">Townhouse</option>
          </select>

          <label for="erf-size">Erf Size (m²):</label>
          <input type="number" id="erf-size" name="erf-size" required />

          <label for="address">Address:</label>
          <input type="text" id="address" name="address" required />

          <label for="suburb">Suburb:</label>
          <input type="text" id="suburb" name="suburb" required />

          <label for="city">City:</label>
          <input type="text" id="city" name="city" required />

          <label for="province">Province:</label>
          <input type="text" id="province" name="province" required />
        </div>

        <div class="form-section">
          <h3>Contacts</h3>
          <label for="seller-name">Seller/Landlord Name:</label>
          <input type="text" id="seller-name" name="seller-name" required />

          <label for="seller-email">Seller/Landlord Email:</label>
          <input type="email" id="seller-email" name="seller-email" required />

          <label for="seller-mobile">Seller/Landlord Mobile Number:</label>
          <input type="tel" id="seller-mobile" name="seller-mobile" required />

          <label for="agent-name">Listing Agent Name:</label>
          <input type="text" id="agent-name" name="agent-name" />

          <label for="agent-email">Listing Agent Email:</label>
          <input type="email" id="agent-email" name="agent-email" />

          <label for="agent-mobile">Listing Agent Mobile Number:</label>
          <input type="tel" id="agent-mobile" name="agent-mobile" />
        </div>

        <div class="form-section">
          <h3>Marketing</h3>
          <label for="list-price">List Price (R):</label>
          <input type="number" id="list-price" name="list-price" required />

          <label for="rates">Rates (R):</label>
          <input type="number" id="rates" name="rates" />

          <label for="levies">Levies (R):</label>
          <input type="number" id="levies" name="levies" />

          <label for="listing-heading">Listing Heading:</label>
          <input
            type="text"
            id="listing-heading"
            name="listing-heading"
            required
          />

          <label for="listing-description">Listing Description:</label>
          <textarea
            id="listing-description"
            name="listing-description"
            rows="5"
            required
          ></textarea>

          <label for="property-images">Upload Images:</label>
          <input
            type="file"
            id="property-images"
            name="property-images[]"
            multiple
          />
        </div>

        <div class="form-section">
          <h3>Features</h3>
          <label for="pets-allowed">Pets Allowed:</label>
          <select id="pets-allowed" name="pets-allowed">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          <label for="bedrooms">Bedrooms:</label>
          <input type="number" id="bedrooms" name="bedrooms" />

          <label for="bathrooms">Bathrooms:</label>
          <input type="number" id="bathrooms" name="bathrooms" />

          <label for="kitchen">Kitchen:</label>
          <input type="checkbox" id="kitchen" name="features" value="Kitchen" />

          <label for="living-room">Living Room:</label>
          <input
            type="checkbox"
            id="living-room"
            name="features"
            value="Living Room"
          />

          <label for="study">Study/Office:</label>
          <input
            type="checkbox"
            id="study"
            name="features"
            value="Study/Office"
          />

          <label for="garage">Garage:</label>
          <input type="checkbox" id="garage" name="features" value="Garage" />

          <label for="carport">Carport:</label>
          <input type="checkbox" id="carport" name="features" value="Carport" />

          <label for="garden">Garden:</label>
          <input type="checkbox" id="garden" name="features" value="Garden" />

          <label for="pool">Pool:</label>
          <input type="checkbox" id="pool" name="features" value="Pool" />

          <label for="flatlet">Flatlet:</label>
          <input type="checkbox" id="flatlet" name="features" value="Flatlet" />
        </div>

        <div class="form-section">
          <h3>Additional Features</h3>
          <textarea
            id="additional-features"
            name="additional-features"
            rows="3"
            placeholder="Add any additional features"
          ></textarea>
        </div>

        <button type="submit">Submit Property</button>
      </form>
    </section>
    </div>
  )
}

export default Sell