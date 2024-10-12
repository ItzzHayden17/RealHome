import React,{useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import SearchAndFilter from '../components/SearchAndFilter'
import PropertyCard from '../components/PropertyCard'
const Rent = () => {

  const [propertiesData,setPropertiesData] = useState(false)

  useEffect(()=>{
    const data = [
      {
        img:"./media/homepage4.jpg",
        price: "15 000 p/m",
        title: "3 Bedroom Townhouse For Sale In Vanderbijlpark SE 2",
        description: "This spacious townhouse is situated in a secure complex, offering open plan living areas with a lovely wooden kitchen...",
        bed: 3,
        bath: 2,
        car: 2,
        pet: true,
        sqrmeter : 1500,
      },
      {
        img:"./media/homepage3.jpg",
        price: "12 000 p/m",
        title: "3 Bedroom Townhouse For Sale In Vanderbijlpark SE 2",
        description: "This spacious townhouse is situated in a secure complex, offering open plan living areas with a lovely wooden kitchen...",
        bed: 3,
        bath: 2,
        car: 2,
        pet: false,
        sqrmeter : 1500,
      },
      {
        img:"./media/homepage1.jpg",
        price: "10 000 p/m",
        title: "3 Bedroom Townhouse For Sale In Vanderbijlpark SE 2",
        description: "This spacious townhouse is situated in a secure complex, offering open plan living areas with a lovely wooden kitchen...",
        bed: 3,
        bath: 2,
        car: 2,
        pet: true,
        sqrmeter : 1500,
      }
    ]
    setPropertiesData(data)
  },[])
  return (
    <div className='BuyOrRent'>
      <Navbar/>
      <SearchAndFilter/>
      
    <section class="properties-list">
      <h2>Properties to <span>Rent</span></h2>
      <div class="properties-grid">
      {propertiesData ? 
        <>
        {propertiesData.map((property)=>{
          return(
            <PropertyCard img={property.img} price={property.price} title={property.title} description={property.description} bed={property.bed} bath={property.bath} car={property.car} pet={property.pet} sqrmeter={property.sqrmeter}  />
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