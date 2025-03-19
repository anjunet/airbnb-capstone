import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FormContainer, Input, TextArea, Button, Label } from "./UpdateListing.styled";

const UpdateListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState({
    title: "",
    location: "",
    price: "",
    images: [],
    bedrooms: "",
    bathrooms: "",
    guests: "",
    type: "",
    amenities: "",
    description: "",
  });

  useEffect(() => {
    // Fetch listing data by ID
    axios
      .get(`/api/listings/${id}`)
      .then((response) => setListing(response.data))
      .catch((error) => console.error("Error fetching listing:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setListing({ ...listing, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/api/listings/${id}`, listing)
      .then(() => {
        alert("Listing updated successfully!");
        navigate("/admin/listings"); // Redirect to listings page
      })
      .catch((error) => console.error("Error updating listing:", error));
  };

  return (
    <FormContainer>
      <h2>Update Listing</h2>
      <form onSubmit={handleSubmit}>
        <Label>Title:</Label>
        <Input type="text" name="title" value={listing.title} onChange={handleChange} required />

        <Label>Location:</Label>
        <Input type="text" name="location" value={listing.location} onChange={handleChange} required />

        <Label>Price:</Label>
        <Input type="number" name="price" value={listing.price} onChange={handleChange} required />

        <Label>Images (comma-separated URLs):</Label>
        <Input type="text" name="images" value={listing.images.join(", ")} onChange={(e) => setListing({ ...listing, images: e.target.value.split(", ") })} />

        <Label>Bedrooms:</Label>
        <Input type="number" name="bedrooms" value={listing.bedrooms} onChange={handleChange} required />

        <Label>Bathrooms:</Label>
        <Input type="number" name="bathrooms" value={listing.bathrooms} onChange={handleChange} required />

        <Label>Guests:</Label>
        <Input type="number" name="guests" value={listing.guests} onChange={handleChange} required />

        <Label>Type:</Label>
        <Input type="text" name="type" value={listing.type} onChange={handleChange} required />

        <Label>Amenities (comma-separated):</Label>
        <Input type="text" name="amenities" value={listing.amenities.join(", ")} onChange={(e) => setListing({ ...listing, amenities: e.target.value.split(", ") })} />

        <Label>Description:</Label>
        <TextArea name="description" value={listing.description} onChange={handleChange} required />

        <Button type="submit">Update Listing</Button>
      </form>
    </FormContainer>
  );
};

export default UpdateListing;
