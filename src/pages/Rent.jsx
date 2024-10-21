import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchAndFilter from "../components/SearchAndFilter";
import PropertyCard from "../components/PropertyCard";
import serverUrl from "../serverUrl";
import Cookie from "js-cookie";
const Rent = () => {
  const [propertiesData, setPropertiesData] = useState(false);

  function handleData(e) {
    setPropertiesData(e);
  }


  const [listingFavArray,setListingFavArray] = useState([])


  function handleData(e) {
    setPropertiesData(e);
    console.log(e);
  }

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
    document.title = "RealHome | Rent a Property";
    try {
      const favListingArray = Cookie.get("favListingArray");
      setListingFavArray(JSON.parse(favListingArray));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="BuyOrRent">
      <Navbar />
      <SearchAndFilter onChange={handleData} sellType="rent" />

      <section class="properties-list">
        <h2>
          Properties to <span>Rent</span>
        </h2>
        <div class="properties-grid">
          {propertiesData ? (
            <>
              {propertiesData.map((property) => {
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
    </div>
  );
};

export default Rent;
