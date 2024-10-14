import React, { useEffect,useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import serverUrl from '../serverUrl'
import axios from "axios"
const PropertyListing = () => {

  const [propertyData,setPropertyData] = useState()
  const listingId = useParams().id
  useEffect(()=>{
    axios.get(serverUrl+"/listing/"+listingId).then((response)=>{
      setPropertyData(response.data)
      console.log(response.data.id);
      
    }).catch((err)=>{
      console.log(err);
    })
  },[])
  
    
  return (
    <div className='Listing'>
      <Navbar/>
      {propertyData ? <>{propertyData.id}</>:<></>}
    </div>
  )
}

export default PropertyListing