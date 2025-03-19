import styled from "styled-components";

export const FormContainer = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const FormTitle = styled.h2`
  text-align: center;
  color: #ff385c;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Label = styled.label`
  font-weight: bold;
  color: #333;
`;

export const Input = styled.input`
  width: 90%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #ff385c;
    outline: none;
  }
`;

export const Textarea = styled.textarea`
  width: 90%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #ff385c;
    outline: none;
  }
`;

export const Select = styled.select`
  width: 95%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #ff385c;
    outline: none;
  }
`;

export const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
`;

export const ImageUploadContainer = styled.div`
  width: 90%;
  border: 2px dashed #ff385c;
  padding: 20px;
  text-align: center;
  border-radius: 6px;
  cursor: pointer;
  color: #ff385c;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 56, 92, 0.1);
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 14px;
  background: #ff385c;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #e03150;
  }
`;
