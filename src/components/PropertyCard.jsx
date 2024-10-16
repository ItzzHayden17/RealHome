import React from "react";
import numeral from "numeral";
import TextTruncate from "react-text-truncate";
import serverUrl from "../serverUrl";
import { Link } from "react-router-dom";
const PropertyCard = (props) => {
  function handleFavourite(e) {
    props.onClick(props.id);
  }
  return (
    <div>
      <div class="property-card">
        <img src={serverUrl + "/image/" + props.img} alt="Property Image" />
        <div class="property-info">
          <div className="favourite">
            {props.isFavourite ? (
              <>
                <i class="fa-solid fa-heart" onClick={handleFavourite}></i>
              </>
            ) : (
              <>
                <i class="fa-regular fa-heart" onClick={handleFavourite}></i>
              </>
            )}{" "}
          </div>
          <Link to={"/listing/" + props.link}>
            <h3>
              R{numeral(props.price).format("0,0").replace(/,/g, " ")}{" "}
              {props.sellType == "rent" ? <>p/m</> : <></>}
            </h3>

            <h4>{props.bed} bedroom {props.type} {props.sellType == "buy" ? <>for sale</>:<>to rent</>} in {props.city}</h4>
            <TextTruncate
              line={1}
              element="p"
              truncateText="…"
              text={props.description}
              style={{ color: "#353941" }}
            />
            <div class="property-details">
              <span>
                <i class="fas fa-bed"></i>
                {props.bed}
              </span>
              <span>
                <i class="fas fa-bath"></i>
                {props.bath}
              </span>
              <span>
                <i class="fas fa-car"></i>
                {props.car}
              </span>
              <span>
                <i class="fas fa-paw"></i>
                {props.pet ? <>Pet-Friendly</> : <>No pets allowed</>}
              </span>
              <span>
                <i class="fas fa-home"></i>
                {props.sqrmeter} m²
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
