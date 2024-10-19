import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import serverUrl from "../serverUrl";
import axios from "axios";
import numeral from "numeral";
import MapComponent from "../components/MapComponent";
const PropertyListing = () => {
  const [propertyData, setPropertyData] = useState();
  const [agentData, setAgentData] = useState({});
  const [agentPicture, setAgentPicture] = useState({});
  const [images, setImages] = useState();
  const listingId = useParams().id;

  useEffect(() => {
    axios
      .get(serverUrl + "/listing/" + listingId)
      .then((response) => {
        setPropertyData(response.data[0]);
        setImages(response.data[0].images);

        if (response.data[1]) {
          setAgentData(response.data[1]);

          setAgentPicture(response.data[1].image);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % propertyData.images.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + propertyData.images.length) %
        propertyData.images.length
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="Listing">
      <Navbar />

      {propertyData && images && images.length > 0 ? (
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
                style={{}}
              />
            </div>
          ))}

          <div class="available_rooms">
            <p>{propertyData.kitchen && <>Kitchen</>}</p>
            <p>{propertyData.livingRoom && <>Living Room</>} </p>
            <p>{propertyData.study && <>Study/Office</>}</p>
            <p>{propertyData.garage && <>Garage</>}</p>
            <p>{propertyData.garden && <>Garden</>}</p>
            <p>{propertyData.pool && <>Pool</>}</p>
            <p>{propertyData.flatlet && <>Flatlet</>}</p>
            <p>
              {propertyData.additionalFeatures && (
                <>Additional Features:{propertyData.additionalFeatures}</>
              )}
            </p>
          </div>
        </div>
      ) : (
        <p>No images available</p>
      )}

      {propertyData ? (
        <>
          <div class="details-container">
            <div class="property-details1">
              <h3>
                {propertyData.bed} bedroom {propertyData.type}{" "}
                {propertyData.sellType == "buy" ? <>to buy</> : <>to rent</>} in{" "}
                {propertyData.suburb}
              </h3>
              <h4>
                R{numeral(propertyData.price).format("0,0").replace(/,/g, " ")}
              </h4>
              <p>
                <span>Address</span>
              </p>
              <p>
                Rates: R
                {numeral(propertyData.levies).format("0,0").replace(/,/g, " ")}{" "}
                Levies: R
                {numeral(propertyData.rates).format("0,0").replace(/,/g, " ")}
              </p>
              <div class="icons">
                <span>
                  <i class="fas fa-bed"></i> {propertyData.bed}
                </span>
                <span>
                  <i class="fas fa-bath"></i> {propertyData.bath}
                </span>
                <span>
                  <i class="fas fa-car"></i> {propertyData.car}
                </span>
                <span>
                  <i class="fas fa-paw"></i>{" "}
                  {propertyData.pet ? <>Pet-friendly</> : <>No pets allowed</>}
                </span>
                <span>
                  <i class="fas fa-home"></i> {propertyData.sqrmeter} m2
                </span>
              </div>
            </div>

            <div class="property-main">
              <div class="property_info">
                <h3>{propertyData.listingHeading}</h3>
                <p class="prop-paragraph">
                  {propertyData.listingDescription
                    .split("\n")
                    .map((line, index) => (
                      <p key={index}>
                        {line}
                        <br />
                      </p>
                    ))}
                </p>

                <div class="available_rooms">
                  <p>Kitchen: </p>
                  <p>Living Room: </p>
                  <p>Study/Office: </p>
                  <p>Garage: </p>
                  <p>Carport: </p>
                  <p>Garden: </p>
                  <p>Pool: </p>
                  <p>Flatlet: </p>
                  <p>Additional Features: </p>
                </div>
              </div>
              {propertyData.lat && (
                <>
                  <MapComponent
                    markers={[
                      {
                        lat: parseFloat(propertyData.lat),
                        lng: parseFloat(propertyData.lng),
                      },
                    ]}
                  />
                </>
              )}
            </div>
          </div>

          {agentData ? (
            <>
              <section class="our-agents">
                <div class="agents">
                  <div class="agent-card">
                    <h2>Seller / Selling Agent</h2>
                    <div class="agent-image">
                      {
                        (agentData.image = "" ? (
                          <>Private seller</>
                        ) : (
                          <>
                            <img
                              src={serverUrl + "/image/" + agentPicture}
                              alt="Agent Photo"
                            />
                          </>
                        ))
                      }
                    </div>
                    <h3>
                      {agentData.name} {agentData.surname}
                    </h3>
                    <p>Property Practitioner</p>
                    <div class="button">
                      <a href={"/agent/" + agentData._id} class="view-all-btn">
                        Contact
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PropertyListing;
