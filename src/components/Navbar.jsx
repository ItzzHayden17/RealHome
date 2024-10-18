import React, { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
import Cookie from "js-cookie";
import serverUrl from "../serverUrl";

const Navbar = (params) => {

  const [user, setUser] = useState(false);
  const [logout, setLogout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (Cookie.get("user")) {
      setUser(JSON.parse(Cookie.get("user")));
    }
  }, []);

  function handleHover(e) {
    if (logout) {
      setLogout(false);
    } else {
      setLogout(true);
    }
  }

  function handleLogout(e) {
    Cookie.remove("user");
    window.location.reload();
  }

  function handleMenuToggle() {
    setMenuOpen(!menuOpen); // Toggle menu state
  }

  return (
    <div className="Navbar">
      <nav class="navbar">
        <div class="logo">
          <a href="/" class="logo">
            <img
              href="/"
              src={serverUrl + "/image/logo2.png"}
              alt="RealHome Logo"
            />
          </a>
        </div>
        <div className="burger" onClick={handleMenuToggle}>
          <div className={`line ${menuOpen ? "open" : ""}`}></div>
          <div className={`line ${menuOpen ? "open" : ""}`}></div>
          <div className={`line ${menuOpen ? "open" : ""}`}></div>
        </div>
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/buy">Buy</Link>
          </li>
          <li>
            <Link to="/rent">Rent</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/sell">List</Link>
              </li>
            </>
          ) : (
            <></>
          )}

          <li>
            <Link to="/agents">Agents</Link>
          </li>
          <li>
            <Link to="/favourites">Favourites</Link>
          </li>

          {user ? <>
            <li>
            <Link to="/wishlist">Wishlist</Link>
          </li>
          </> : <></>}

          {user ? (
            <div onMouseEnter={handleHover} onMouseLeave={handleHover}>
              <li>
                <a>
                  <span>Hello {user.name}</span>
                </a>
              </li>
              {logout ? (
                <>
                  <div className="logout" onClick={handleLogout}>
                    Logout
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
