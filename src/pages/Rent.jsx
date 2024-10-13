import React,{useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import SearchAndFilter from '../components/SearchAndFilter'
import PropertyCard from '../components/PropertyCard'
import serverUrl from '../serverUrl'
const Rent = () => {

  const [propertiesData,setPropertiesData] = useState(false)

  function handleData(e){
    setPropertiesData(e)
  }

  return (
    <div className='BuyOrRent'>
      <Navbar/>
      <SearchAndFilter onChange={handleData} sellType="rent"/>
      
    <section class="properties-list">
      <h2>Properties to <span>Rent</span></h2>
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

export default Rent