import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import FeaturedListingCard from "../components/FeaturedListingCard";
import Cookie from "js-cookie";
import serverUrl from "../serverUrl";
import axios from "axios";
const Home = () => {
  const [user, setUser] = useState(false);
  const [logout, setLogout] = useState(false);
  const [agentsData, setAgentsData] = useState([]);

  const [featuredListings, setFeaturedListings] = useState(false);

  useEffect(() => {
    //Use this to get data from server and set the useState.

    const data = [
      {
        img: "./media/homepage2.jpg",
        title: "3 Bedroom House",
        price: "12 345 678",
        location: "Moreleta Park, Pretoria",
        reference: "111223533",
      },
      {
        img: "./media/homepage2.jpg",
        title: "3 Bedroom House",
        price: "12 345 678",
        location: "Moreleta Park, Pretoria",
        reference: "111223533",
      },
      {
        img: "./media/homepage2.jpg",
        title: "3 Bedroom House",
        price: "12 345 678",
        location: "Moreleta Park, Pretoria",
        reference: "111223533",
      },
      {
        img: "./media/homepage2.jpg",
        title: "3 Bedroom House",
        price: "12 345 678",
        location: "Moreleta Park, Pretoria",
        reference: "111223533",
      },
      {
        img: "./media/homepage1.jpg",
        title: "1 Bedroom House",
        price: "12 345 678",
        location: "Moreleta Park, Pretoria",
        reference: "111223533",
      },
    ];
    setFeaturedListings(data);

    if (Cookie.get("user")) {
      setUser(JSON.parse(Cookie.get("user")));
    }

    axios.get(serverUrl + "/all-agents").then((response) => {
      const top3 = response.data.slice(0, 3);
      setAgentsData(top3);
      console.log(top3);
      
    }).catch((err)=>{
      if (err) {
        console.log(err);
        
      }
    })
  },[])

  function handleHover(e){
    console.log(e);

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

  return (
    <div className="Home">
      <header>
        <nav class="navbar">
          <div class="logo">
            <a href="index.html" class="logo">
              <img
                href="index.html"
                src="./media/logo3.png"
                alt="RealHome Logo"
              />
            </a>
          </div>
          <ul class="nav-links">
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
              </> // Changed "Sell" to "List"
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
          Featured <span>Listings</span>
        </h2>
        <div class="listings">
          {featuredListings ? (
            <>
              {featuredListings.map((listing) => {
                return (
                  <FeaturedListingCard
                    img={listing.img}
                    title={listing.title}
                    price={listing.price}
                    location={listing.location}
                    reference={listing.reference}
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
    </div>
  );
};

export default Home;
