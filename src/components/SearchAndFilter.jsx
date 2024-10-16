import React ,{useState,useEffect,useMemo} from 'react';
import axios from "axios";
import serverUrl from '../serverUrl';
const SearchAndFilter = (props) => {


  const [propertiesData,setPropertiesData] = useState([])
  const [filters,setFilters] = useState({suburb:"",type:"",city:"",price:0})

  var filteredData = useMemo(() => {
    return propertiesData.filter((data) => {
      return (
        (filters.suburb == "" || data.suburb.toLowerCase().includes(filters.suburb.toLowerCase()) ) &&
        (filters.type == "" || data.type.toLowerCase() == filters.type.toLowerCase()) &&
        (filters.city == "" || data.city.toLowerCase() == filters.city.toLowerCase()) &&
        (filters.price == "" ||
          data.price >= Number(filters.price) && data.price <= Number(filters.price)+50000) &&
          (data.sellType.toLowerCase() == props.sellType)
      )
    });
  }, [propertiesData,filters]);

  props.onChange(filteredData);
  
  function handleFilter(e){
    const {name,value} = e.target
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    console.log(value);
    
  }


  useEffect(() => {
    axios.get(serverUrl+ '/properties')
      .then((response) => {
        const data = response.data;
        setPropertiesData(data);  
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <div className='SearchAndFilter' >
        <section class="search-filter">
      <div class="search-container">
        <input
          type="text"
          placeholder="Search by location"
          id="search-location"
          name="suburb" 
         onChange={handleFilter}/>
        <select id="property-type" name="type" onChange={handleFilter} >
          <option value="">Property Type</option>
          <option value="House">House</option>
          <option value="Apartment">Apartment</option>
          <option value="Townhouse">Townhouse</option>
        </select>
        <select id="price-range" name="price" onChange={handleFilter}>
          <option value="">Price Range</option>
          <option value="0">R0 - R50 000</option>
          <option value="50000">R0 - R100 000</option>
          <option value="100000">R100 000 - R150 000</option>
          <option value="150000">R150 000 - R200 000</option>
          <option value="200000">R200 000 - R250 000</option>
          <option value="250000">R250 000 - R300 000</option>
          <option value="300000">R300 000 - R350 000</option>
          <option value="350000">R350 000 - R400 000</option>
          <option value="400000">R400 000 - R450 000</option>
          <option value="450000">R450 000 - R500 000</option>
          <option value="500000">R500 000 - R550 000</option>
          <option value="550000">R550 000 - R600 000</option>
          <option value="600000">R600 000 - R650 000</option>
          <option value="650000">R650 000 - R700 000</option>
          <option value="700000">R700 000 - R750 000</option>
          <option value="750000">R750 000 - R800 000</option>
          <option value="800000">R800 000 - R850 000</option>
          <option value="850000">R850 000 - R900 000</option>
          <option value="900000">R900 000 - R950 000</option>
          <option value="950000">R950 000 - R1 000 000</option>
          <option value="1000000">R1 000 000 - R1 250 000</option>
          <option value="1250000">R1 250 000 - R1 500 000</option>
          <option value="1500000">R1 500 000 - R1 750 000</option>
          <option value="1750000">R1 750 000 - R2 000 000</option>
          <option value="2000000">R2 000 000 - R2 250 000</option>
          <option value="2250000">R2 250 000 - R2 500 000</option>
          <option value="2500000">R2 500 000 - R2 750 000</option>
          <option value="2750000">R2 750 000 - R3 000 000</option>
          <option value="3000000">R3 000 000 - R4 000 000</option>
          <option value="4000000">R4 000 000 - R5 000 000</option>
        </select>
        <button onclick="searchProperties()">Search</button>
      </div>
    </section>
    </div>
  )
}

export default SearchAndFilter