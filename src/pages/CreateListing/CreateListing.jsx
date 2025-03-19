import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation hook
import {
  FormContainer,
  FormTitle,
  Form,
  Label,
  Input,
  Textarea,
  Select,
  CheckboxGroup,
  CheckboxLabel,
  ImageUploadContainer,
  Button,
} from "./CreateListing.styled";
import {
  Header,
  HeaderContainer,
  HeaderLeft,
  HeaderRight,
  Logo,
  MenuButton,
  ProfileImage,
  ProfileMenu,
  DropdownMenu,
  MenuItem,
} from "../admin/dashboard/Dashboard.styled";
import { GlobeIcon, Menu } from "lucide-react";

const CreateListing = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // 🔹 Form Data State
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    guests: "",
    type: "",
    price: "",
    amenities: [],
    images: [],
    weeklyDiscount: "",
    cleaningFee: "",
    serviceFee: "",
    occupancyTaxes: "",
  });

  // 🔹 User Authentication States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // 🔹 Handle Form Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Handle Image Uploads
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  // 🔹 Handle Checkbox (Amenities) Selection
  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, value]
        : prev.amenities.filter((amenity) => amenity !== value),
    }));
  };

  // 🔹 Validate Form Before Submitting
  const validateForm = () => {
    if (!formData.title || !formData.location || !formData.price) {
      alert("Title, Location, and Price are required fields.");
      return false;
    }
    return true;
  };

  // 🔹 Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((file) =>
          formDataToSend.append("images", file)
        );
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch("/api/accommodations", {
        method: "POST",
        body: formDataToSend, // Send as multipart/form-data
      });

      const result = await response.json();
      if (response.ok) {
        alert("Listing created successfully!");
      } else {
        alert(result.message || "Error creating listing.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  // 🔹 Close Dropdown When Clicking Outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* 🔹 HEADER NAVIGATION */}
      <Header>
        <HeaderContainer>
          <HeaderLeft>
            <Logo
              onClick={() => navigate("/")}
              src="https://1000logos.net/wp-content/uploads/2017/08/Airbnb-Logo-768x432.png"
            />
          </HeaderLeft>

          <HeaderRight>
            {isLoggedIn ? (
              <>
                <span>Welcome, {username}</span>
                <ProfileMenu ref={dropdownRef}>
                  <MenuButton onClick={() => setShowDropdown(!showDropdown)}>
                    <Menu />
                  </MenuButton>
                  <ProfileImage
                    src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg"
                    alt="Profile"
                  />
                  {showDropdown && (
                    <DropdownMenu>
                      <MenuItem onClick={() => navigate("/reservations")}>
                        View Reservations
                      </MenuItem>
                      <MenuItem onClick={() => setIsLoggedIn(false)}>
                        Log Out
                      </MenuItem>
                    </DropdownMenu>
                  )}
                </ProfileMenu>
              </>
            ) : (
              <>
                <button onClick={() => navigate("/create-listing")}>
                  Become a host
                </button>
                <GlobeIcon />
                <ProfileMenu ref={dropdownRef}>
                  <MenuButton onClick={() => setShowDropdown(!showDropdown)}>
                    <Menu />
                  </MenuButton>
                  <ProfileImage
                    onClick={() => setShowAuthModal(true)}
                    src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                    alt="Profile"
                  />
                  {showDropdown && (
                    <DropdownMenu>
                      <MenuItem onClick={() => setShowAuthModal(true)}>
                        Login
                      </MenuItem>
                      <MenuItem onClick={() => setShowAuthModal(true)}>
                        Sign Up
                      </MenuItem>
                    </DropdownMenu>
                  )}
                </ProfileMenu>
              </>
            )}
          </HeaderRight>
        </HeaderContainer>
      </Header>

      {/* 🔹 CREATE LISTING FORM */}
      <FormContainer>
        <FormTitle>Create a Listing</FormTitle>
        <Form onSubmit={handleSubmit}>
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <Label>Location</Label>
          <Input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <Label>Description</Label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <Label>Type</Label>
          <Select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
          </Select>

          <Label>Upload Images</Label>
          <ImageUploadContainer>
            <input type="file" multiple onChange={handleFileChange} />
          </ImageUploadContainer>

          <Button type="submit">Create Listing</Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default CreateListing;
