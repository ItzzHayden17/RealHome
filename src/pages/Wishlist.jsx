import React,{useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import serverUrl from '../serverUrl'
import Cookie from "js-cookie";

const Wishlist = () => {

    const [user, setUser] = useState(false);

    useEffect(() => {
        if (Cookie.get("user")) {
          setUser(JSON.parse(Cookie.get("user")));
        }
      }, []);

      {console.log(user.email);
      }
  return (
    <div className='Wishlist' >
        <Navbar/>
        <div className="sell-property">
        <div className="form-section">
        <form action={serverUrl+"/wishlist"} method='POST'>
        <input type="hidden" name='email' value={user.email} />
        
        <label htmlFor="price">Price:</label>
        <input type="number" id='price' name='price'/>

        <label htmlFor="bed">Bed:</label>
        <input type="number" id='bed' name='bed'/>

        <label htmlFor="bath">Bath:</label>
        <input type="number" id='bath' name='bath'/>

        <label htmlFor="car">Car:</label>
        <input type="number" id='car' name='car'/>
        
        <label htmlFor="type">Rent or Buy:</label>
        <input type="text" id='type' name='type'/>

        <label htmlFor="suburb">Suburb:</label>
        <input type="text" id='suburb' name='suburb'/>

        <label htmlFor="pet">Pet friendly:</label>
        <select id='pet' name='pet'>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
        </select>

        <label htmlFor="city">City:</label>
        <input type="text" id='city'name='city'/>

        <label htmlFor="province">Province:</label>
        <input type="text" id='province' name='province'/>
        <button type='submit'>Post</button>
        </form>
        </div>  
        </div>
    </div>
  )
}

export default Wishlist