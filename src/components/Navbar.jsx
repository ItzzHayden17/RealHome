import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
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
          <li><Link to="/sell">Sell</Link></li>
          <li><Link to="/agents">Agents</Link></li>
          <li><Link to="/favourites">Favourites</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar