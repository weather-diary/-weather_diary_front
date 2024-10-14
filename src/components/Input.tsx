// src/components/Input.tsx
import React from "react";
import styled from "styled-components";

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  required,
}) => {
  return (
    <StyledInput
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
};

export default Input;

const StyledInput = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border: none;
  border-radius: 8px;
  background-color: #f7fafc;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
  font-size: 1rem;
  transition: background-color 0.2s ease;
`;
