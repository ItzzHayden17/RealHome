import React, { useEffect,useState } from 'react'
import Navbar from '../components/Navbar'
import SearchAndFilter from '../components/SearchAndFilter'
import PropertyCard from '../components/PropertyCard'
import serverUrl from '../serverUrl'
const Buy = () => {

  const [propertiesData,setPropertiesData] = useState(false)

  function handleData(e){
    setPropertiesData(e)
    console.log(e);
    
  }


  return (
    <div className='BuyOrRent'>
      <Navbar/> 
    <SearchAndFilter onChange={handleData} sellType="buy"/>
    <section class="properties-list">
      <h2>Properties for <span>Sale</span></h2>
      <div class="properties-grid">
        {propertiesData ? 
        <>
        {propertiesData.map((property)=>{
          return(
            <PropertyCard img={serverUrl+"/image/"+property.images[0]} price={property.price} title={property.listingHeading} description={property.listingDescription} bed={property.bed} bath={property.bath} car={property.car} pet={property.pet} sqrmeter={property.sqrmeter}  />
          )
        })}
        </>
        :
        <>Loading</>}
      </div>
    </section>

      
    </div>
  )
}

export default Buy