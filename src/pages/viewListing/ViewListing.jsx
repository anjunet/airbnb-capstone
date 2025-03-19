import React, { useEffect, useState } from "react";
import { ListingsContainer, ListingCard, ListingImage, ListingDetails, ActionButtons } from "./ViewListings.styled";
import axios from "axios";

const ViewListings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Fetch listings from backend API
    axios
      .get("/api/listings")
      .then((response) => setListings(response.data))
      .catch((error) => console.error("Error fetching listings:", error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          setListings(listings.filter((listing) => listing._id !== id));
        })
        .catch((error) => console.error("Error deleting listing:", error));
    }
  };

  return (
    <ListingsContainer>
      {listings.length > 0 ? (
        listings.map((listing) => (
          <ListingCard key={listing._id}>
            <ListingImage src={listing.images[0]} alt={listing.title} />
            <ListingDetails>
              <h3>{listing.title}</h3>
              <p>📍 {listing.location}</p>
              <p>💰 ${listing.price} / night</p>
              <ActionButtons>
                <button onClick={() => window.location.href = `/edit-listing/${listing._id}`}>Update</button>
                <button onClick={() => handleDelete(listing._id)}>Delete</button>
              </ActionButtons>
            </ListingDetails>
          </ListingCard>
        ))
      ) : (
        <p>No listings available.</p>
      )}
    </ListingsContainer>
  );
};

export default ViewListings;
