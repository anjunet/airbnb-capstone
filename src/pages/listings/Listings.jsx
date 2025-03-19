import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  ListingsContainer,
  ListingCard,
  ListingImage,
  ListingDetails,
  Price,
} from "./Listings.styled";

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get selected location from the URL query
  const location = new URLSearchParams(useLocation().search).get("location") || "All Locations";

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/locations?location=${location}`);
        setListings(response.data);
      } catch (err) {
        setError("Failed to fetch listings");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [location]);

  return (
    <ListingsContainer>
      <h1>Listings in {location}</h1>
      {loading && <p>Loading listings...</p>}
      {error && <p>{error}</p>}
      {!loading && listings.length === 0 && <p>No listings available for this location.</p>}

      {listings.map((listing) => (
        <ListingCard key={listing._id}>
          <ListingImage src={listing.image} alt={listing.title} />
          <ListingDetails>
            <h3>{listing.title}</h3>
            <p>{listing.location}</p>
            <Price>${listing.price} / night</Price>
          </ListingDetails>
        </ListingCard>
      ))}
    </ListingsContainer>
  );
};

export default Listings;
