import React ,{useEffect,useState}from 'react'
import Navbar from '../components/Navbar'
import serverUrl from '../serverUrl';
import Cookie from "js-cookie"
import axios from 'axios'
import numeral from 'numeral';

const Favourites = () => {
  const [propertiesData,setPropertiesData] = useState([])
  const [listingFavArray,setListingFavArray] = useState([])

  function handleFavourite(e){
    if (listingFavArray.some((favId) => favId === e)) {
      const updatedFavorites = listingFavArray.filter((favId) => favId !== e);
      setListingFavArray(updatedFavorites);
      Cookie.set('favListingArray', JSON.stringify(updatedFavorites), { expires: 7000000 });
  } else {
    setListingFavArray((prev) => [...prev, e]);
      Cookie.set('favListingArray', JSON.stringify([...listingFavArray, e]), { expires: 7000000 });
  }
  }

  useEffect(() => {
    axios.get(serverUrl+ '/properties')
      .then((response) => {
        const data = response.data;
        setPropertiesData(data);  
        console.log(data);
        
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

      try {
        const favListingArray = Cookie.get("favListingArray")
        setListingFavArray(JSON.parse(favListingArray))
      } catch (error) {
        console.log(error );
        
      }
  }, []);
  return (
    <div className='Favourites'>
      <Navbar />
      <section class="favourites-section">
        <h2>Your Favourite Listings</h2>
        <div class="favourites-container">

      {propertiesData.map((property)=>{
        const isFavorite = listingFavArray.some((id) => id === property.id)
        return isFavorite ?(
          <div class="favourite-card">
          <img
            src={serverUrl+'/image/'+property.images[0]}
            alt="Property 1"
            class="favourite-photo"
          />
          <h3>{property.bed} bedroom {property.type} in {property.suburb}</h3>
          <p>Price: R{numeral(property.price).format('0,0').replace(/,/g, ' ')}</p>
          <p>Location: {property.suburb}, {property.city}</p>
          <button class="remove-favourite-btn" onClick={()=>{handleFavourite(property.id)}}>Remove from Favourites</button>
        </div>):null
      })}
      
      </div>
      </section>
    </div>
  )
}

export default Favourites