import React,{useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import serverUrl from '../serverUrl'
import Cookie from "js-cookie";
import axios from 'axios';

const EditProfile = () => {

    const [user, setUser] = useState(false);
    const [dataUrl,setDataUrl] = useState(false)
    useEffect(()=>{

        
    if (Cookie.get("user")) {
      const userId = JSON.parse(Cookie.get("user"))._id
      axios.get(serverUrl+"/agent/"+userId).then((response)=>{
        setUser(response.data)
      })
      }
        
    },[])

    function handleChange(e){
      const  {name,value,type} = e.target
      const newValue = type === "number" ? parseFloat(value) : (value)
      setUser((prev) => ({...prev,[name]:newValue})) 
    }

    function handleImage(e){
        const file = e.target.files[0]

        const reader = new FileReader()

        reader.onloadend = ()=>{
            setDataUrl(reader.result)
            console.log(reader.result);
        }

        reader.readAsDataURL(file)
    }

  return (
    <div className='EditProfile'>
        <Navbar/>
        <div className="form-container">
            <form action={serverUrl+"/edit-profile/"+user._id} method="POST" enctype="multipart/form-data" onChange={handleChange} >
            <div className="image-container">
            <label htmlFor="profileImage">Profile image:</label>
            {dataUrl ? <>
                <img src={dataUrl} alt="" />
                </>:
                <>
                <img src={serverUrl+"/image/"+user.image} alt="" />
                <input type="text" name='agentImage' value={user.image} hidden />
                </>}
            <input type="file" name='agentImage' id='agentImage' onChange={handleImage}/>
            </div>

            <label htmlFor="name">Name:</label>
            <input type="text" name='name' value={user.name} />

            <label htmlFor="surname">Surname:</label>
            <input type="text" name='surname' value={user.surname} />

            <label htmlFor="email">Email:</label>
            <input type="email" name='email' value={user.email} />

            <label htmlFor="number">Number:</label>
            <input type="number" name='number' value={user.number} />

            <button type='submit'>Edit</button>
            </form>
        </div>
    </div>
  )
}

export default EditProfile