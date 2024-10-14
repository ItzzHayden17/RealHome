import React, { useEffect,useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import serverUrl from '../serverUrl'
import Cookie from "js-cookie"
const Agents = () => {

  const [agentsData,setAgentsData] = useState([])
  const [userId,setUserId] = useState(false)

  useEffect(()=>{
    axios.get(serverUrl+"/all-agents").then((response)=>{
      setAgentsData(response.data)
    }).catch((err)=>{
      console.log("error fetching data:",err);
    })

    try {
      setUserId(JSON.parse(Cookie.get("user"))._id)
      console.log(JSON.parse(Cookie.get("user"))._id);
    } catch (error) {
      console.log("User not logged in");
    }

  },[])
  return (
    <div className='Agents'>
      <Navbar/>
      <section class="agents-section">
      <h2>Meet Our <span>Agents</span></h2>
      <div class="agents-container">
      {agentsData.map((agent)=>{
        return(
          
          <div class="agent-card">
            {console.log(agent)
            }
            <img src={serverUrl+"/image/"+agent.image} alt="Agent 1 Photo" class="agent-photo" />
            <h3>{agent.name} {agent.surname}</h3>
            <p>Property Practitioner</p>
            <p>Email: {agent.email}</p>
            <p>Phone: 0{agent.number}</p>
            {userId ? <>{userId == agent._id ? <><button class="edit-profile-btn">Edit profile</button></> :<><button class="contact-agent-btn">Contact</button></>}</> :<>Log in to contact</>}
          </div>
        
        )
      })}
      </div>
    </section>
    </div>
  )
}

export default Agents