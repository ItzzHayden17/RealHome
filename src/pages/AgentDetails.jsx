import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import serverUrl from "../serverUrl";
import PropertyCard from "../components/PropertyCard";
import Cookie from "js-cookie";
const AgentDetails = () => {
  const agentId = useParams().id;
  const [agentData, setAgentData] = useState();
  const [listingData, setListingData] = useState([]);
  const [listingFavArray, setListingFavArray] = useState([]);

  useEffect(() => {
    document.title = "RealHome | Agent";
    axios
      .get(serverUrl + "/agent/" + agentId)
      .then((response) => {
        setAgentData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios.get(serverUrl + "/properties").then((response) => {
      const userListings = response.data.filter(
        (listing) => listing.userWhoListedID == agentId
      );
      setListingData(userListings);
      console.log(userListings, agentId);
    });
  }, []);

  function handleFavourite(e) {
    if (listingFavArray.some((favId) => favId === e)) {
      const updatedFavorites = listingFavArray.filter((favId) => favId !== e);
      setListingFavArray(updatedFavorites);
      Cookie.set("favListingArray", JSON.stringify(updatedFavorites), {
        expires: 7000000,
      });
    } else {
      setListingFavArray((prev) => [...prev, e]);
      Cookie.set("favListingArray", JSON.stringify([...listingFavArray, e]), {
        expires: 7000000,
      });
    }
  }

  useEffect(() => {
    try {
      const favListingArray = Cookie.get("favListingArray");
      setListingFavArray(JSON.parse(favListingArray));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="AgentDetails">
      <Navbar />
      {agentData ? (
        <>
          <div className="agent-details">
            <div className="card">
              {agentData.image ? (
                <>
                  <div className="image-container">
                    <img src={serverUrl + "/image/" + agentData.image} alt="" />
                  </div>
                </>
              ) : (
                <></>
              )}

              <div className="details-container">
                <h1>
                  {agentData.name} {agentData.surname}
                </h1>
                <p>
                  <i class="fa-regular fa-envelope"></i> {agentData.email}
                </p>
                <p>
                  <i class="fa-solid fa-phone"></i> 0{agentData.number}{" "}
                </p>
                <button>Call</button>
              </div>
            </div>
            <div className="form"></div>
          </div>

          <div className="sell-property">
            <form
              method="POST"
              className="form-section"
              action={serverUrl + "/contact-agent/" + agentId}
            >
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" />
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" />
              <label htmlFor="message">Message:</label>
              <textarea name="message" id="message"></textarea>
              <button type="submit">Contact</button>
            </form>
          </div>
        </>
      ) : (
        <>Loading..</>
      )}
      <section class="BuyOrRent  properties-list ">
        <div class="properties-grid">
          {listingData ? (
            <>
              {listingData.map((property) => {
                return (
                  <PropertyCard
                    key={property.id}
                    id={property.id}
                    img={property.images[0]}
                    price={property.price}
                    title={property.listingHeading}
                    description={property.listingDescription}
                    bed={property.bed}
                    bath={property.bath}
                    car={property.car}
                    pet={property.pet}
                    sqrmeter={property.sqrmeter}
                    type={property.type}
                    city={property.city}
                    sellType="rent"
                    link={property._id}
                    suburb={property.suburb}
                    isFavourite={listingFavArray.some(
                      (id) => property.id === id
                    )}
                    onClick={handleFavourite}
                  />
                );
              })}
            </>
          ) : (
            <>Loading</>
          )}
        </div>
      </section>
      <div class="empty-div">
        <h1>Div</h1>
      </div>
    </div>
  );
};

export default AgentDetails;
