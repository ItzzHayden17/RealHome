import React, { useEffect, useState } from 'react'
import { Link, redirect } from 'react-router-dom'
import Cookie from "js-cookie"
const Navbar = () => {
  const [user,setUser] = useState(false)
  const [logout,setLogout] = useState(false)

  useEffect(()=>{
    if(Cookie.get("user")){
      setUser(JSON.parse(Cookie.get("user")))
    }
  },[])

  function handleHover(e){
    console.log(e);
    
    if (logout) {
      setLogout(false)
    }else{
      setLogout(true)
    }
  }

  function handleLogout(e){
    Cookie.remove("user")
    window.location.reload()
  }
  return (
    <div className='Navbar'>
        <nav class="navbar">
        <div class="logo">
          <a href="index.html" class="logo">
            <img
              href="index.html"
              src="./media/logo2.png"
              alt="RealHome Logo"
            />
          </a>
        </div>
        <ul class="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/buy">Buy</Link></li>
          <li><Link to="/rent">Rent</Link></li>
          {user.isAgent? 
          <><li><Link to="/sell">Sell</Link></li></>:
          <></>}
          
          <li><Link to="/agents">Agents</Link></li>
          <li><Link to="/favourites">Favourites</Link></li>
          {user ? 
          <div onMouseEnter={handleHover} onMouseLeave={handleHover}><li><a><span>Hello {user.name}</span></a></li>
          {logout? <><div className='logout' onClick={handleLogout}>Logout</div></>:<></>}
          </div>:
          <><li><Link to="/login">Login</Link></li></>}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar