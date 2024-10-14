import React, { useEffect,useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import serverUrl from '../serverUrl'
const Agents = () => {

  const [agentsData,setAgentsData] = useState([])

  useEffect(()=>{
    axios.get(serverUrl+"/all-agents").then((response)=>{
      setAgentsData(response.data)
    })
  })
  return (
    <div className='Agents'>
      <Navbar/>
      <section class="agents-section">
      <h2>Meet Our <span>Agents</span></h2>
      <div class="agents-container">
      {agentsData.map((agent)=>{
        return(
          
          <div class="agent-card">
            <img src={serverUrl+"/image/"+agent.image} alt="Agent 1 Photo" class="agent-photo" />
            <h3>{agent.name} {agent.surname}</h3>
            <p>Property Practitioner</p>
            <p>Email: {agent.email}</p>
            <p>Phone: 0{agent.number}</p>
            <button class="contact-agent-btn">Contact</button>
          </div>
        
        )
      })}
      </div>
    </section>
    </div>
  )
}

export default Agents