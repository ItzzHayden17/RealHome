import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import FeaturedListingCard from "../components/FeaturedListingCard";
import Cookie from "js-cookie";
import serverUrl from "../serverUrl";
import axios from "axios";
import MapComponent from "../components/MapComponent";

const Home = () => {
  const [user, setUser] = useState(false);
  const [logout, setLogout] = useState(false);
  const [agentsData, setAgentsData] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [menuActive, setMenuActive] = useState(false);
  const [featuredListings, setFeaturedListings] = useState([]);

  useEffect(() => {
    //Use this to get data from server and set the useState.
    document.title = "RealHome | Home";

    axios.get(serverUrl + "/properties").then((response) => {
      const data = response.data.slice(0, 5);
      setFeaturedListings(data);
      console.log(data);
    });

    if (Cookie.get("user")) {
      setUser(JSON.parse(Cookie.get("user")));
    }

    axios
      .get(serverUrl + "/all-agents")
      .then((response) => {
        const top3 = response.data.slice(0, 3);
        setAgentsData(top3);
        console.log(top3);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(serverUrl + "/properties")
      .then((response) => {
        var responseMarkers = [];
        response.data.forEach((property) => {
          if (property.lat && property.lng) {
            responseMarkers.push({
              lat: parseFloat(property.lat),
              lng: parseFloat(property.lng),
            });
          }
        });
        setMarkers(responseMarkers);
        console.log(markers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleHover(e) {
    console.log(e);

    if (logout) {
      setLogout(false);
    } else {
      setLogout(true);
    }
  }

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  function handleLogout(e) {
    Cookie.remove("user");
    window.location.reload();
  }

  return (
    <div className="Home">
      <header>
        <nav class="navbar">
          <div class="logo">
            <a href="/" class="logo">
              <img href="/" src="./media/logo3.png" alt="RealHome Logo" />
            </a>
          </div>
          <ul className={`nav-links ${menuActive ? "active" : ""}`}>
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
            {user ? (
              <>
                <li>
                  <Link to="/wishlist">Wishlist</Link>
                </li>
              </>
            ) : (
              <></>
            )}
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
          <div className="burger" onClick={toggleMenu}>
            <div className={`line ${menuActive ? "open" : ""}`}></div>
            <div className={`line ${menuActive ? "open" : ""}`}></div>
            <div className={`line ${menuActive ? "open" : ""}`}></div>
          </div>
        </nav>
      </header>
      <section class="hero">
        <div class="search-bar">
          <input type="text" placeholder="Search by location, price, type..." />
          <button>
            <i class="fas fa-search"></i>
          </button>
        </div>
      </section>

      <section class="featured-listings">
        <h2>
          Latest <span>Listings</span>
        </h2>
        <div class="listings">
          {featuredListings ? (
            <>
              {featuredListings.map((listing) => {
                return (
                  <FeaturedListingCard
                    id={listing._id}
                    img={serverUrl + "/image/" + listing.images[0]}
                    title={listing.listingHeading}
                    price={listing.price}
                    location={listing.city}
                    reference={listing._id}
                  />
                );
              })}
            </>
          ) : (
            <>Loading</>
          )}
        </div>
        <div>
          <a href="/buy" class="view-all-btn">
            View All Properties
          </a>
        </div>
      </section>

      <section class="about-us">
        <div class="about-us-title">
          <h2>
            About <span>RealHome</span>
          </h2>
        </div>
        <div class="about-body">
          <p>
            RealHome is an innovative real estate listing platform designed to
            connect agents and public users in one seamless online space.
            Whether you're looking to buy, sell or rent, RealHome offers a
            user-friendly experience where properties can be easily listed,
            browsed, and managed. Built to cater to both real estate
            professionals and individuals, RealHome aims to simplify the
            property market by providing a centralized, accessible platform for
            all your real estate needs. Whether you're an agent looking to
            expand your listings or a user searching for your next home,
            RealHome is your trusted digital destination.
          </p>
        </div>
      </section>

      <section class="our-agents">
        <h2>
          Our <span>Agents</span>
        </h2>
        <div class="agents">
          {agentsData.map((agent) => {
            return (
              <div class="agent-card">
                <img
                  src={serverUrl + "/image/" + agent.image}
                  alt="Agent Photo"
                />
                <h3>
                  {agent.name} {agent.surname}
                </h3>
                <p>Property Practitioner</p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="google-maps">
        <h2 id="areas">
          Areas <span>Serviced</span>
        </h2>
        <div class="map-only">
          <MapComponent markers={markers} />
        </div>
      </div>
    </div>
  );
};

export default Home;
