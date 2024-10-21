import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import serverUrl from "../serverUrl";
import axios from "axios";
import numeral from "numeral";
import MapComponent from "../components/MapComponent";
import Cookie from "js-cookie";

const PropertyListing = () => {
  const [propertyData, setPropertyData] = useState();
  const [agentData, setAgentData] = useState({});
  const [agentPicture, setAgentPicture] = useState("");
  const [images, setImages] = useState([]);
  const [userId, setUserId] = useState(null);
  const listingId = useParams().id;

  useEffect(() => {
    document.title = "RealHome | Listing";
    axios
      .get(`${serverUrl}/listing/${listingId}`)
      .then((response) => {
        console.log(response);

        setPropertyData(response.data[0]);
        setImages(response.data[0].images || []);
        if (response.data[1]) {
          setAgentData(response.data[1]);
          setAgentPicture(response.data[1].image);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    try {
      setUserId(JSON.parse(Cookie.get("user"))._id);
      console.log(JSON.parse(Cookie.get("user"))._id);
    } catch (error) {
      console.log("User not logged in");
    }
  }, [listingId]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  function handleEdit(e) {
    if (e.target.name === "delete") {
      const confirm = window.confirm(
        "Are you sure you want to delete this listing? This action is irreversible."
      );
      if (confirm) {
        axios.delete(serverUrl + "/delete/" + listingId);
      }
    } else {
      window.location.href = "/edit-listing/" + listingId;
    }
  }
  return (
    <div className="Listing">
      <Navbar />
      {userId === agentData._id && (
        <>
          <div className="edit-listing">
            <button
              onClick={handleEdit}
              name="edit"
              className="contact-agent-btn"
            >
              Edit
            </button>
            <button
              onClick={handleEdit}
              name="delete"
              className="edit-profile-btn"
            >
              Delete
            </button>
          </div>
        </>
      )}
      {propertyData && images.length > 0 ? (
        <div className="slideshow-container">
          {images.map((image, index) => (
            <div
              className={`mySlides fade ${
                currentIndex === index ? "active" : ""
              }`}
              key={index}
            >
              <img
                className="main"
                src={`${serverUrl}/image/${image}`}
                alt={`Property Image ${index + 1}`}
              />
            </div>
          ))}
          <a className="prev" onClick={prevSlide}>
            &#10094;
          </a>
          <a className="next" onClick={nextSlide}>
            &#10095;
          </a>
        </div>
      ) : (
        <p>No images available</p>
      )}

      {propertyData ? (
        <>
          <div className="details-container">
            <div className="property-details1">
              <h3>
                {propertyData.bed} Bedroom {propertyData.type}{" "}
                {propertyData.sellType === "buy" ? <>to Buy</> : <>to Rent</>}{" "}
                in {propertyData.suburb}
              </h3>
              <h4>
                R{numeral(propertyData.price).format("0,0").replace(/,/g, " ")}
              </h4>
              <p>{propertyData.address}</p>
              <p>
                Rates: R
                {numeral(propertyData.rates).format("0,0").replace(/,/g, " ")}{" "}
                Levies: R
                {numeral(propertyData.levies).format("0,0").replace(/,/g, " ")}
              </p>
              <div className="icons">
                <span>
                  <i className="fas fa-bed"></i> {propertyData.bed}
                </span>
                <span>
                  <i className="fas fa-bath"></i> {propertyData.bath}
                </span>
                <span>
                  <i className="fas fa-car"></i> {propertyData.car}
                </span>
                <span>
                  <i className="fas fa-paw"></i>{" "}
                  {propertyData.pet ? <>Pet-friendly</> : <>No pets allowed</>}
                </span>
                <span>
                  <i className="fas fa-home"></i> {propertyData.sqrmeter} m²
                </span>
              </div>
            </div>

            <div className="property-main">
              <div className="property_info">
                <h3>{propertyData.listingHeading}</h3>
                <p className="prop-paragraph">
                  {propertyData.listingDescription
                    .split("\n")
                    .map((line, index) => (
                      <p key={index}>
                        {line}
                        <br />
                      </p>
                    ))}
                </p>

                <div className="available_rooms">
                  <p>{propertyData.kitchen && <>Kitchen</>}</p>
                  <p>{propertyData.livingRoom && <>Living Room</>}</p>
                  <p>{propertyData.study && <>Study/Office</>}</p>
                  <p>{propertyData.garage && <>Garage</>}</p>
                  <p>{propertyData.garden && <>Garden</>}</p>
                  <p>{propertyData.pool && <>Pool</>}</p>
                  <p>{propertyData.flatlet && <>Flatlet</>}</p>
                  <p>
                    {propertyData.additionalFeatures && (
                      <>
                        Additional Features: {propertyData.additionalFeatures}
                      </>
                    )}
                  </p>
                </div>
              </div>
              {propertyData.lat && (
                <MapComponent
                  markers={[
                    {
                      lat: parseFloat(propertyData.lat),
                      lng: parseFloat(propertyData.lng),
                    },
                  ]}
                />
              )}
            </div>
          </div>

          {agentData ? (
            <section className="our-agents">
              <div className="agents">
                <div className="agent-card">
                  <h2>Seller / Selling Agent</h2>
                  <div className="agent-image">
                    {agentData.image ? (
                      <img
                        src={`${serverUrl}/image/${agentPicture}`}
                        alt="Agent Photo"
                      />
                    ) : (
                      <>Private seller</>
                    )}
                  </div>
                  <h3>
                    {agentData.name} {agentData.surname}
                  </h3>
                  <p>Property Practitioner</p>
                  <div className="button">
                    <a
                      href={`/agent/${agentData._id}`}
                      className="view-all-btn"
                    >
                      Contact
                    </a>
                  </div>
                </div>
              </div>
            </section>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default PropertyListing;
