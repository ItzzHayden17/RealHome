import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Cookie from "js-cookie";
import serverUrl from "../serverUrl";
import AddressAutocomplete from "../components/AutoComplete";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditListing = () => {
  const [userId, setUserId] = useState(null);
  const [autoComplete,setAutoComplete] = useState({lat:"",lng:"",address:""})
  const [listingData,setListingData] = useState({})
  const [imagesArray,setImagesArray] = useState([])
  const [dataURLArray,setDataURLArray] = useState([])
  const listingId = useParams().id
  useEffect(() => {
    try {
      setUserId(JSON.parse(Cookie.get("user"))._id);
    } catch (error) {
      console.log("User not logged in");
    }
    try {
        axios.get(serverUrl+"/listing/"+listingId).then((response)=>{
            setListingData(response.data[0])
            setImagesArray(response.data[0].images)    
        })
    } catch (error) {
        console.log(error);
        
    }
  },[]);

  function handleAutoComplete(e){
    setAutoComplete(e)
  }

  function handleInput (e){
    const {name,value,type} = e.target
    const newValue = type === "number" ? parseFloat(value) : (value)
    setListingData((prev) => ({...prev,[name]:newValue})) 
  }

  function handleImageUpdate(e){
    e.preventDefault()
    console.log(e.target.name);
    console.log(imagesArray);
    
    if (e.target.id == "serverURL") {
      setImagesArray((prev) => prev.filter(image => image !== e.target.name))
    }else{
      setDataURLArray((prev) => prev.filter(image => image !== e.target.name))
    }
  }

  function handleChange(e){
    const files = e.target.files;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        setDataURLArray((prev) => [...prev,reader.result])
      };
  
      reader.readAsDataURL(file);
    });



  }

  return (
    <div className="Sell">
      <Navbar />
     
      <section class="sell-property">
        <h2>
          Edit Your <span>Property</span>
        </h2>
        <form
          id="property-form"
          action={serverUrl + "/edit-listing/"+listingData._id}
          method="post"
          enctype="multipart/form-data"
          onChange={handleInput}
        >
          <input type="text" hidden="true" name="userId" value={userId} />
          <div class="form-section">
            <h3>Property Details</h3>
            <label for="listingType">Listing Type:</label>
            <select id="listingType" name="listingType">
              <option value="buy" name="listingType">
                Sale
              </option>
              <option value="rent" name="listingType">
                Rental
              </option>
            </select>

            <label for="propertyType">Property Type:</label>
            <select id="propertyType" name="propertyType">
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Townhouse">Townhouse</option>
            </select>

            <label for="erfSize">Erf Size (m²):</label>
            <input type="number" id="erfSize" name="sqrmeter" required value={listingData.sqrmeter} />

            <label for="address">Address:</label>
            <AddressAutocomplete onChange={handleAutoComplete}/>
            <input type="hidden" id="address" name="address" value={autoComplete.address} required />
            <input type="hidden" id="lat" name="lat" value={autoComplete.lat} required />
            <input type="hidden" id="lng" name="lng" value={autoComplete.lng} required />

            <label for="city">City:</label>
            <input type="text" id="city" name="city" value={listingData.city} required />

            <label for="suburb">Suburb:</label>
            <input type="text" id="suburb" name="suburb" value={listingData.suburb} required />

            <label for="province">Province:</label>
            <input type="text" id="province" name="province" value={listingData.province} required />
          </div>

          <div class="form-section">
            <h3>Contacts</h3>
            <label for="sellerName">Seller/Landlord Name:</label>
            <input type="text" id="sellerName" name="sellerName" value={listingData.sellerName} required />

            <label for="sellerEmail">Seller/Landlord Email:</label>
            <input type="email" id="sellerEmail" name="sellerEmail" value={listingData.sellerEmail} required />

            <label for="seller-mobile">Seller/Landlord Mobile Number:</label>
            <input type="tel" id="sellerMobile" name="sellerMobile" value={listingData.sellerMobile} required />

            <label for="agent-name">Listing Agent Name:</label>
            <input type="text" id="agent-name" name="agentName" value={listingData.agentName} />

            <label for="agent-email">Listing Agent Email:</label>
            <input type="email" id="agent-email" name="agentEmail" value={listingData.agentEmail}/>

            <label for="agent-mobile">Listing Agent Mobile Number:</label>
            <input type="tel" id="agent-mobile" name="agentMobile" value={listingData.agentMobile}/>
          </div>

          <div class="form-section">
            <h3>Marketing</h3>
            <label for="list-price">List Price (R):</label>
            <input type="number" id="list-price" name="price" value={listingData.price} required />

            <label for="rates">Rates (R):</label>
            <input type="number" id="rates" name="rates" value={listingData.rates} />

            <label for="levies">Levies (R):</label>
            <input type="number" id="levies" name="levies" value={listingData.levies}/>

            <label for="listing-heading">Listing Heading:</label>
            <input
              type="text"
              id="listing-heading"
              name="listingHeading"
              value={listingData.listingHeading}
              required
              
            />

            <label for="listing-description">Listing Description:</label>
            <textarea
              id="listing-description"
              name="listingDescription"
              rows="5"
              value={listingData.listingDescription}
              required
            ></textarea>
            <label >Edit images:</label>
            <div className="images-container">
            {imagesArray.length > 0 ? <>
            {imagesArray.map((image)=>{
                return( 
                    <div className="image-container">
                        <button className="remove-image" onClick={handleImageUpdate} name={image} id="serverURL">x</button>
                        <input type="hidden" name="images" value={image} />
                        <img src={serverUrl+"/image/"+image} alt="" />
                    </div>
                    
                )
            })}
            </>:<></>}
            {dataURLArray.length > 0 ? <>
            {dataURLArray.map((image)=>{
                return( 
                    <div className="image-container">
                        <button className="remove-image" onClick={handleImageUpdate} name={image} id="dataURL" >x</button>
                        <input type="hidden" name="images" value={image} />
                        <img src={image} alt="" />
                    </div>
                    
                )
            })}
            </>:<></>}
            </div>

            <label for="property-images">Upload Images:</label>
            <input
              type="file"
              id="property-images"
              name="property-images"
              multiple
              onChange={handleChange}
            />
          </div>

          <div class="form-section">
            <h3>Features</h3>
            <label for="pets-allowed">Pets Allowed:</label>
            <select id="petsAllowed" name="petsAllowed">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            <label for="bedrooms">Bedrooms:</label>
            <input
              type="number"
              id="bedrooms"
              name="bed"
              placeholder="Amount of bedrooms"
              value={listingData.bed}
            />

            <label for="bathrooms">Bathrooms:</label>
            <input
              type="number"
              id="bathrooms"
              name="bath"
              placeholder="Amount of bathrooms"
              value={listingData.bath}
            />

            <label for="carports">Garages:</label>
            <input
              type="number"
              id="carports"
              name="car"
              placeholder="2 if double garage"
              value={listingData.car}
            />

            <div className="additional-features">
                {listingData.kitchen && <>              <label for="kitchen">Kitchen:</label>
              <input
                type="checkbox"
                id="kitchen"
                name="kitchen"
                value="Kitchen"
              /></>}

              <label for="living-room">Living Room:</label>
              <input
                type="checkbox"
                id="living-room"
                name="livingRoom"
                value="Living Room"
              />

              <label for="study">Study/Office:</label>
              <input
                type="checkbox"
                id="study"
                name="study"
                value="Study/Office"
              />

              <label for="carport">Carport:</label>
              <input
                type="checkbox"
                id="carport"
                name="carport"
                value="Carport"
              />

              <label for="garden">Garden:</label>
              <input
                type="checkbox"
                id="garden"
                name="garden"
                value="Garden"
              />

              <label for="pool">Pool:</label>
              <input type="checkbox" id="pool" name="pool" value="Pool" />

              <label for="flatlet">Flatlet:</label>
              <input
                type="checkbox"
                id="flatlet"
                name="flatlet"
                value="Flatlet"
              />
            </div>
          </div>

          <div class="form-section">
            <h3>Additional Features</h3>
            <textarea
              id="additional-features"
              name="additionalFeatures"
              rows="3"
              placeholder="Add any additional features"
              value={listingData.additionalFeatures}
            ></textarea>
          </div>
          <input type="hidden" name="listingId" value={listingData._id} />
          <button type="submit">Edit Property</button>
        </form>
      </section>
    </div>
  );
};

export default EditListing;
