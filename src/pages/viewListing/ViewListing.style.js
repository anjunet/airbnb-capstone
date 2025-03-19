import styled from "styled-components";

export const ListingsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
`;

export const ListingCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.03);
  }
`;

export const ListingImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const ListingDetails = styled.div`
  padding: 15px;
  text-align: center;

  h3 {
    font-size: 1.2rem;
    margin: 5px 0;
  }

  p {
    color: #666;
    margin: 5px 0;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;

  button {
    background: #ff385c;
    color: #fff;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: 0.2s ease-in-out;

    &:hover {
      background: #d0304e;
    }
  }
`;
