import styled from "styled-components";

export const ListingsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

export const ListingCard = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin: 15px 0;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }
`;

export const ListingImage = styled.img`
  width: 150px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 15px;
`;

export const ListingDetails = styled.div`
  flex: 1;
  text-align: left;

  h3 {
    margin: 5px 0;
    font-size: 18px;
  }

  p {
    color: #555;
    font-size: 14px;
  }
`;

export const Price = styled.p`
  font-weight: bold;
  color: #ff5a5f;
  font-size: 16px;
`;
